"use strict";exports.id=650,exports.ids=[650],exports.modules={5439:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var r in t)Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}(t,{DYNAMIC_ERROR_CODE:function(){return r},DynamicServerError:function(){return DynamicServerError}});let r="DYNAMIC_SERVER_USAGE";let DynamicServerError=class DynamicServerError extends Error{constructor(e){super("Dynamic server usage: "+e),this.digest=r}};("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},45020:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"staticGenerationBailout",{enumerable:!0,get:function(){return staticGenerationBailout}});let o=r(5439),n=r(45869);let StaticGenBailoutError=class StaticGenBailoutError extends Error{constructor(...e){super(...e),this.code="NEXT_STATIC_GEN_BAILOUT"}};function formatErrorMessage(e,t){let{dynamic:r,link:o}=t||{};return"Page"+(r?' with `dynamic = "'+r+'"`':"")+" couldn't be rendered statically because it used `"+e+"`."+(o?" See more info here: "+o:"")}let staticGenerationBailout=(e,t)=>{let r=n.staticGenerationAsyncStorage.getStore();if(null==r?void 0:r.forceStatic)return!0;if(null==r?void 0:r.dynamicShouldError){var a;throw new StaticGenBailoutError(formatErrorMessage(e,{...t,dynamic:null!=(a=null==t?void 0:t.dynamic)?a:"error"}))}if(!r||(r.revalidate=0,(null==t?void 0:t.dynamic)||(r.staticPrefetchBailout=!0)),null==r?void 0:r.isStaticGeneration){let n=new o.DynamicServerError(formatErrorMessage(e,{...t,link:"https://nextjs.org/docs/messages/dynamic-server-error"}));throw r.dynamicUsageDescription=e,r.dynamicUsageStack=n.stack,n}return!1};("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},54647:(e,t)=>{var r;Object.defineProperty(t,"x",{enumerable:!0,get:function(){return r}}),function(e){e.PAGES="PAGES",e.PAGES_API="PAGES_API",e.APP_PAGE="APP_PAGE",e.APP_ROUTE="APP_ROUTE"}(r||(r={}))}};