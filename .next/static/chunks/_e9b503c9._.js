(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/lib/anilist.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>HomePage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$anilist$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/anilist.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
const sections = [
    {
        title: '🔥 Trending Anime',
        type: 'ANIME',
        sort: 'TRENDING_DESC'
    },
    {
        title: '🌟 Top-Rated Anime',
        type: 'ANIME',
        sort: 'SCORE_DESC'
    },
    {
        title: '📚 Popular Manga',
        type: 'MANGA',
        sort: 'POPULARITY_DESC'
    },
    {
        title: '🧠 Top-Rated Manga',
        type: 'MANGA',
        sort: 'SCORE_DESC'
    }
];
function HomePage() {
    _s();
    const [data, setData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "HomePage.useEffect": ()=>{
            const fetchAll = {
                "HomePage.useEffect.fetchAll": async ()=>{
                    const newData = {};
                    for (const section of sections){
                        const list = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$anilist$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchAniListExplore"])(section.type, section.sort);
                        newData[section.title] = list;
                    }
                    setData(newData);
                }
            }["HomePage.useEffect.fetchAll"];
            fetchAll();
        }
    }["HomePage.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-6 space-y-12",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "text-3xl font-bold",
                children: "Welcome to your Library"
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 38,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-gray-600 mb-6",
                children: "This is your private anime-manga dashboard 🎌"
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 39,
                columnNumber: 7
            }, this),
            sections.map((section)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-xl font-semibold",
                                    children: section.title
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 44,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: `/explore?type=${section.type}&sort=${section.sort}`,
                                    className: "text-sm text-blue-500 hover:underline",
                                    children: "Explore more →"
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 45,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 43,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "overflow-x-auto",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex space-x-4",
                                children: (data[section.title] || []).map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: `/${section.type.toLowerCase()}/${item.id}`,
                                        className: "min-w-[150px] bg-white shadow rounded p-2 hover:scale-105 transition",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                src: item.coverImage.medium,
                                                alt: "cover",
                                                className: "w-full h-48 object-cover rounded"
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 61,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "mt-2 text-sm font-semibold truncate",
                                                children: item.title.english || item.title.romaji
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 66,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-gray-500",
                                                children: item.format
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 69,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, item.id, true, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 56,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 54,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 53,
                            columnNumber: 11
                        }, this)
                    ]
                }, section.title, true, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 42,
                    columnNumber: 9
                }, this))
        ]
    }, void 0, true, {
        fileName: "[project]/app/page.tsx",
        lineNumber: 37,
        columnNumber: 5
    }, this);
}
_s(HomePage, "tNVKLF/eI269iIOS4WygXQde5D8=");
_c = HomePage;
var _c;
__turbopack_context__.k.register(_c, "HomePage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=_e9b503c9._.js.map