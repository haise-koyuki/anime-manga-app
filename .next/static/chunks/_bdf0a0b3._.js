(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/lib/useUser.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "useUser": (()=>useUser)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabaseClient.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function useUser() {
    _s();
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useUser.useEffect": ()=>{
            const getSession = {
                "useUser.useEffect.getSession": async ()=>{
                    const { data: { session } } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].auth.getSession();
                    setUser(session?.user ?? null);
                }
            }["useUser.useEffect.getSession"];
            getSession();
            const { data: listener } = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].auth.onAuthStateChange({
                "useUser.useEffect": (_event, session)=>{
                    setUser(session?.user ?? null);
                }
            }["useUser.useEffect"]);
            return ({
                "useUser.useEffect": ()=>{
                    listener.subscription.unsubscribe();
                }
            })["useUser.useEffect"];
        }
    }["useUser.useEffect"], []);
    return user;
}
_s(useUser, "5s2qRsV95gTJBmaaTh11GoxYeGE=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/anime/[id]/ReviewSection.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>ReviewsSection)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabaseClient.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$useUser$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/useUser.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function ReviewsSection({ mediaId, mediaType }) {
    _s();
    const [reviews, setReviews] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [content, setContent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const user = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$useUser$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUser"])();
    const [votes, setVotes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [userVotes, setUserVotes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [expanded, setExpanded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const toggleExpanded = (id)=>{
        setExpanded((prev)=>({
                ...prev,
                [id]: !prev[id]
            }));
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ReviewsSection.useEffect": ()=>{
            console.log("Fetching reviews for media ID:", mediaId);
            const fetchReviews = {
                "ReviewsSection.useEffect.fetchReviews": async ()=>{
                    const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('reviews').select('*').eq('media_id', mediaId).eq('media_type', mediaType).order('created_at', {
                        ascending: false
                    });
                    if (error) {
                        console.error('❌ Error fetching reviews:', error);
                        setReviews([]);
                    } else {
                        setReviews(data);
                    }
                }
            }["ReviewsSection.useEffect.fetchReviews"];
            fetchReviews();
        }
    }["ReviewsSection.useEffect"], [
        mediaId,
        mediaType
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ReviewsSection.useEffect": ()=>{
            const fetchVotes = {
                "ReviewsSection.useEffect.fetchVotes": async ()=>{
                    const voteQuery = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('review_votes').select('review_id, vote');
                    const userVoteQuery = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('review_votes').select('review_id, vote').eq('user_id', user?.id);
                    const allVotes = voteQuery.data || [];
                    const voteCount = {};
                    allVotes.forEach({
                        "ReviewsSection.useEffect.fetchVotes": (v)=>{
                            voteCount[v.review_id] = (voteCount[v.review_id] || 0) + v.vote;
                        }
                    }["ReviewsSection.useEffect.fetchVotes"]);
                    setVotes(voteCount);
                    const myVotes = {};
                    (userVoteQuery.data || []).forEach({
                        "ReviewsSection.useEffect.fetchVotes": (v)=>{
                            myVotes[v.review_id] = v.vote;
                        }
                    }["ReviewsSection.useEffect.fetchVotes"]);
                    setUserVotes(myVotes);
                }
            }["ReviewsSection.useEffect.fetchVotes"];
            if (user?.id) fetchVotes();
        }
    }["ReviewsSection.useEffect"], [
        reviews,
        user?.id
    ]);
    const handleVote = async (reviewId, value)=>{
        if (!user) return;
        const existing = userVotes[reviewId];
        let newValue = value;
        if (existing === value) {
            newValue = 0;
        }
        const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('review_votes').upsert({
            user_id: user.id,
            review_id: reviewId,
            vote: newValue || null
        });
        if (error) {
            console.error('Vote error:', error);
            return;
        }
        const updatedVotes = {
            ...votes
        };
        updatedVotes[reviewId] = (updatedVotes[reviewId] || 0) + (newValue - (existing || 0));
        setVotes(updatedVotes);
        const updatedUserVotes = {
            ...userVotes
        };
        if (newValue === 0) delete updatedUserVotes[reviewId];
        else updatedUserVotes[reviewId] = newValue;
        setUserVotes(updatedUserVotes);
    };
    const handleSubmit = async (e)=>{
        e.preventDefault();
        if (!content.trim()) return;
        if (!user) {
            alert("You need to log in to submit a review.");
            return;
        }
        // Use user.id directly from supabase user object
        const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('reviews').insert([
            {
                media_id: mediaId,
                media_type: mediaType,
                user_id: user.id,
                content
            }
        ]).select().single();
        if (error) {
            console.error('❌ Error submitting review:', error);
            alert('Failed to submit review');
        } else {
            setReviews((prev)=>[
                    data,
                    ...prev
                ]);
            setContent('');
        }
    };
    // ✅ RETURN MUST BE HERE, OUTSIDE handleSubmit
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            reviews.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-gray-500 italic",
                children: "No reviews from users yet — be the first to write one!"
            }, void 0, false, {
                fileName: "[project]/app/anime/[id]/ReviewSection.tsx",
                lineNumber: 148,
                columnNumber: 9
            }, this),
            reviews.map((review)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                            children: [
                                "User ",
                                review.user_id,
                                ":"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/anime/[id]/ReviewSection.tsx",
                            lineNumber: 155,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm text-gray-800 whitespace-pre-line",
                            children: expanded[review.id] ? review.content : review.content.length > 300 ? review.content.slice(0, 300) + '...' : review.content
                        }, void 0, false, {
                            fileName: "[project]/app/anime/[id]/ReviewSection.tsx",
                            lineNumber: 156,
                            columnNumber: 11
                        }, this),
                        review.content.length > 300 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>toggleExpanded(review.id),
                            className: "text-xs text-blue-600 underline mt-1",
                            children: expanded[review.id] ? 'Show less' : 'Read more'
                        }, void 0, false, {
                            fileName: "[project]/app/anime/[id]/ReviewSection.tsx",
                            lineNumber: 164,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2 text-sm mt-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: `hover:text-green-600 ${userVotes[review.id] === 1 ? 'text-green-600 font-bold' : 'text-gray-400'}`,
                                    onClick: ()=>handleVote(review.id, 1),
                                    type: "button",
                                    children: "▲"
                                }, void 0, false, {
                                    fileName: "[project]/app/anime/[id]/ReviewSection.tsx",
                                    lineNumber: 172,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: votes[review.id] ?? 0
                                }, void 0, false, {
                                    fileName: "[project]/app/anime/[id]/ReviewSection.tsx",
                                    lineNumber: 181,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: `hover:text-red-600 ${userVotes[review.id] === -1 ? 'text-red-600 font-bold' : 'text-gray-400'}`,
                                    onClick: ()=>handleVote(review.id, -1),
                                    type: "button",
                                    children: "▼"
                                }, void 0, false, {
                                    fileName: "[project]/app/anime/[id]/ReviewSection.tsx",
                                    lineNumber: 182,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/anime/[id]/ReviewSection.tsx",
                            lineNumber: 171,
                            columnNumber: 11
                        }, this)
                    ]
                }, review.id, true, {
                    fileName: "[project]/app/anime/[id]/ReviewSection.tsx",
                    lineNumber: 154,
                    columnNumber: 9
                }, this)),
            user ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                onSubmit: handleSubmit,
                className: "mt-6 space-y-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        htmlFor: "review",
                        className: "block font-medium text-gray-700",
                        children: "Write your review:"
                    }, void 0, false, {
                        fileName: "[project]/app/anime/[id]/ReviewSection.tsx",
                        lineNumber: 197,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                        id: "review",
                        rows: 4,
                        className: "w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500",
                        placeholder: "Share your thoughts about this title...",
                        value: content,
                        onChange: (e)=>setContent(e.target.value),
                        required: true
                    }, void 0, false, {
                        fileName: "[project]/app/anime/[id]/ReviewSection.tsx",
                        lineNumber: 200,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "submit",
                        className: "px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700",
                        children: "Submit Review"
                    }, void 0, false, {
                        fileName: "[project]/app/anime/[id]/ReviewSection.tsx",
                        lineNumber: 209,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/anime/[id]/ReviewSection.tsx",
                lineNumber: 196,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-4 text-gray-700",
                children: [
                    "Want to share your thoughts?",
                    ' ',
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        href: "/login",
                        className: "text-blue-600 underline hover:text-blue-800",
                        children: "Log in to write a review."
                    }, void 0, false, {
                        fileName: "[project]/app/anime/[id]/ReviewSection.tsx",
                        lineNumber: 219,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/anime/[id]/ReviewSection.tsx",
                lineNumber: 217,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true);
}
_s(ReviewsSection, "nnaGUlhFqsVXa/F+bzitMNrCGqI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$useUser$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUser"]
    ];
});
_c = ReviewsSection;
var _c;
__turbopack_context__.k.register(_c, "ReviewsSection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/anime/[id]/ReviewSection.tsx [app-client] (ecmascript, next/dynamic entry)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.n(__turbopack_context__.i("[project]/app/anime/[id]/ReviewSection.tsx [app-client] (ecmascript)"));
}}),
}]);

//# sourceMappingURL=_bdf0a0b3._.js.map