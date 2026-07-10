// Edge Function "off-search": proxy de busca de alimentos para a Open Food Facts.
//
// Por que essa função existe: a API v2 da Open Food Facts (world.openfoodfacts.org)
// tem CORS liberado, mas não suporta busca por texto livre — só filtros estruturados
// (categoria, marca). Quem faz busca de texto de verdade é o serviço Search-a-licious
// (search.openfoodfacts.org), mas ele não envia cabeçalho Access-Control-Allow-Origin,
// então o navegador bloqueia a chamada direto do front-end. Esta função roda no servidor
// (sem restrição de CORS), repassa a busca para o Search-a-licious e devolve o resultado
// já com CORS liberado para o nosso domínio.

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { q } = await req.json();

    if (!q || typeof q !== "string" || q.trim().length < 2) {
      return new Response(
        JSON.stringify({ error: "Informe pelo menos 2 caracteres para buscar." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const searchUrl = `https://search.openfoodfacts.org/search?q=${encodeURIComponent(
      q.trim()
    )}&page_size=15&fields=code,product_name,brands,nutriments`;

    const offResponse = await fetch(searchUrl);

    if (!offResponse.ok) {
      throw new Error(`Open Food Facts respondeu com status ${offResponse.status}`);
    }

    const offData = await offResponse.json();
    const hits = Array.isArray(offData.hits) ? offData.hits : [];

    // Só repassa produtos com nome e caloria conhecidos — sem isso o item não é útil
    // para montar uma refeição com dados nutricionais.
    const results = hits
      .filter((p: any) => p.product_name && p.nutriments?.["energy-kcal_100g"] != null)
      .map((p: any) => ({
        code: p.code ?? null,
        name: p.product_name,
        brand: Array.isArray(p.brands) ? p.brands[0] : p.brands ?? null,
        kcal100: p.nutriments["energy-kcal_100g"],
        protein100: p.nutriments.proteins_100g ?? 0,
        carbs100: p.nutriments.carbohydrates_100g ?? 0,
        fat100: p.nutriments.fat_100g ?? 0,
      }));

    return new Response(JSON.stringify({ results }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Erro na busca de alimentos:", err);
    return new Response(
      JSON.stringify({ error: "Não foi possível buscar alimentos agora. Tente novamente." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
