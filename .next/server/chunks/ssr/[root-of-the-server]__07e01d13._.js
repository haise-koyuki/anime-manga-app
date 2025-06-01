module.exports = {

"[externals]/stream [external] (stream, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}}),
"[externals]/http [external] (http, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}}),
"[externals]/url [external] (url, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}}),
"[externals]/punycode [external] (punycode, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("punycode", () => require("punycode"));

module.exports = mod;
}}),
"[externals]/https [external] (https, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}}),
"[externals]/zlib [external] (zlib, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}}),
"[project]/lib/supabaseClient.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "supabase": (()=>supabase)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/supabase-js/dist/module/index.js [app-ssr] (ecmascript) <locals>");
;
const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(("TURBOPACK compile-time value", "https://pqwmpfhyjlmusjzajkon.supabase.co"), ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBxd21wZmh5amxtdXNqemFqa29uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDczMjA5MDEsImV4cCI6MjA2Mjg5NjkwMX0.xy3cpkZtnvKqGJ283GzwcEhvldJJuYX9uch7liV5raM"), {
    auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
    }
});
}}),
"[project]/lib/anilist.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "fetchAniListExplore": (()=>fetchAniListExplore),
    "fetchMedia": (()=>fetchMedia),
    "fetchMediaById": (()=>fetchMediaById)
});
async function fetchMediaById(id) {
    const query = `
    query ($id: Int) {
      Media(id: $id) {
        id
        title {
          romaji
          english
          native
        }
        coverImage {
          medium
        }
        format
      }
    }
  `;
    const response = await fetch('https://graphql.anilist.co', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({
            query,
            variables: {
                id
            }
        })
    });
    const json = await response.json();
    if (json.errors) {
        throw new Error(json.errors.map((e)=>e.message).join(', '));
    }
    return json.data.Media;
}
async function fetchAniListExplore(type, sort) {
    const query = `
    query ($type: MediaType, $sort: [MediaSort]) {
      Page(perPage: 20) {
        media(type: $type, sort: $sort) {
          id
          title {
            romaji
            english
            native
          }
          coverImage {
            medium
          }
          format
        }
      }
    }
  `;
    const variables = {
        type,
        sort: [
            sort
        ]
    };
    const response = await fetch('https://graphql.anilist.co', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({
            query,
            variables
        })
    });
    const json = await response.json();
    if (json.errors) {
        throw new Error(json.errors.map((e)=>e.message).join(', '));
    }
    return json.data.Page.media;
}
async function fetchMedia({ searchQuery, filters, page = 1, perPage = 20 }) {
    // Convert yearGroup to startDate bounds for AniList filtering
    const yearBounds = (yearGroup)=>{
        switch(yearGroup){
            case '2021-2025':
                return {
                    startDate_greater: 20210101,
                    startDate_lesser: 20251231
                };
            case '2016-2020':
                return {
                    startDate_greater: 20160101,
                    startDate_lesser: 20201231
                };
            case '2011-2015':
                return {
                    startDate_greater: 20110101,
                    startDate_lesser: 20151231
                };
            case '2006-2010':
                return {
                    startDate_greater: 20060101,
                    startDate_lesser: 20101231
                };
            case '2001-2005':
                return {
                    startDate_greater: 20010101,
                    startDate_lesser: 20051231
                };
            case '1996-2000':
                return {
                    startDate_greater: 19960101,
                    startDate_lesser: 20001231
                };
            case '1991-1995':
                return {
                    startDate_greater: 19910101,
                    startDate_lesser: 19951231
                };
            case '1986-1990':
                return {
                    startDate_greater: 19860101,
                    startDate_lesser: 19901231
                };
            case 'before-1985':
                return {
                    startDate_lesser: 19851231
                };
            default:
                return {};
        }
    };
    const { startDate_greater, startDate_lesser } = yearBounds(filters.yearGroup);
    const query = `
    query (
      $page: Int,
      $perPage: Int,
      $search: String,
      $type: MediaType,
      $genre: String,
      $sort: [MediaSort],
      $startDate_greater: Int,
      $startDate_lesser: Int
    ) {
      Page(page: $page, perPage: $perPage) {
        media(
          search: $search,
          type: $type,
          genre: $genre,
          sort: $sort,
          startDate_greater: $startDate_greater,
          startDate_lesser: $startDate_lesser
        ) {
          id
          title {
            romaji
            english
            native
          }
          coverImage {
            large
            medium
          }
          description
          format
          status
          episodes
          duration
          genres
          averageScore
        }
      }
    }
  `;
    const variables = {
        page,
        perPage,
        search: searchQuery || null,
        type: filters.type || null,
        genre: filters.genre || null,
        sort: filters.sort ? [
            filters.sort
        ] : [
            'POPULARITY_DESC'
        ],
        startDate_greater: startDate_greater || null,
        startDate_lesser: startDate_lesser || null
    };
    const response = await fetch('https://graphql.anilist.co', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({
            query,
            variables
        })
    });
    const json = await response.json();
    console.log('AniList API response:', json);
    if (json.errors) {
        throw new Error(json.errors.map((e)=>e.message).join(', '));
    }
    return json.data.Page.media;
}
}}),
"[project]/app/library/page.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>LibraryPage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabaseClient.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$anilist$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/anilist.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
const statuses = [
    'watching',
    'interested',
    'completed',
    'dropped'
];
function LibraryPage() {
    const [items, setItems] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const fetchLibrary = async ()=>{
            const { data: { user }, error: userError } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].auth.getUser();
            if (userError) {
                console.error('Error fetching user:', userError.message);
                setLoading(false);
                return;
            }
            if (!user?.id) {
                console.warn('User is not logged in');
                setLoading(false);
                return;
            }
            console.log('USER ID:', user.id);
            const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('user_library').select('*').eq('user_id', user.id);
            if (error) {
                console.error('Fetch error:', error.message);
            } else {
                console.log('Fetched library items:', data);
                setItems(data || []);
                const detailed = await Promise.all(data.map(async (item)=>{
                    const media = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$anilist$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetchMediaById"])(item.media_id);
                    return {
                        ...item,
                        media
                    };
                }));
                setItems(detailed);
            }
            setLoading(false);
        };
        fetchLibrary();
    }, []);
    if (loading) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
        children: "Loading your library..."
    }, void 0, false, {
        fileName: "[project]/app/library/page.tsx",
        lineNumber: 69,
        columnNumber: 23
    }, this);
    if (items.length === 0) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
        children: "Your library is empty. Add some titles!"
    }, void 0, false, {
        fileName: "[project]/app/library/page.tsx",
        lineNumber: 71,
        columnNumber: 34
    }, this);
    // Group by media_type and then by status
    const grouped = {
        anime: {},
        manga: {}
    };
    statuses.forEach((status)=>{
        grouped.anime[status] = items.filter((item)=>item.media_type === 'anime' && item.status === status);
        grouped.manga[status] = items.filter((item)=>item.media_type === 'manga' && item.status === status);
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-6 space-y-8",
        children: [
            'anime',
            'manga'
        ].map((mediaType)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-2xl font-bold capitalize mb-4",
                        children: mediaType
                    }, void 0, false, {
                        fileName: "[project]/app/library/page.tsx",
                        lineNumber: 95,
                        columnNumber: 11
                    }, this),
                    statuses.map((status)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-xl font-semibold capitalize mb-2",
                                    children: status
                                }, void 0, false, {
                                    fileName: "[project]/app/library/page.tsx",
                                    lineNumber: 98,
                                    columnNumber: 15
                                }, this),
                                grouped?.[mediaType]?.[status]?.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: "No titles in this category."
                                }, void 0, false, {
                                    fileName: "[project]/app/library/page.tsx",
                                    lineNumber: 100,
                                    columnNumber: 17
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                    className: "list-disc list-inside",
                                    children: grouped?.[mediaType]?.[status]?.map((item)=>item?.media_id && item?.media_type ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "flex items-center space-x-4 cursor-pointer hover:bg-gray-100 p-2 rounded",
                                            onClick: ()=>{
                                                window.location.href = `/${item.media_type}/${item.media_id}`;
                                            },
                                            children: item.media?.coverImage?.medium ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                src: item.media.coverImage.medium,
                                                alt: "cover",
                                                className: "w-12 h-16 object-cover rounded"
                                            }, void 0, false, {
                                                fileName: "[project]/app/library/page.tsx",
                                                lineNumber: 113,
                                                columnNumber: 27
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-12 h-16 bg-gray-200 flex items-center justify-center text-xs text-gray-500 rounded"
                                            }, void 0, false, {
                                                fileName: "[project]/app/library/page.tsx",
                                                lineNumber: 115,
                                                columnNumber: 27
                                            }, this)
                                        }, item.id, false, {
                                            fileName: "[project]/app/library/page.tsx",
                                            lineNumber: 105,
                                            columnNumber: 23
                                        }, this) : null)
                                }, void 0, false, {
                                    fileName: "[project]/app/library/page.tsx",
                                    lineNumber: 102,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, status, true, {
                            fileName: "[project]/app/library/page.tsx",
                            lineNumber: 97,
                            columnNumber: 13
                        }, this))
                ]
            }, mediaType, true, {
                fileName: "[project]/app/library/page.tsx",
                lineNumber: 94,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/app/library/page.tsx",
        lineNumber: 92,
        columnNumber: 5
    }, this);
}
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__07e01d13._.js.map