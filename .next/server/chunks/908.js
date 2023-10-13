"use strict";exports.id=908,exports.ids=[908],exports.modules={5569:(a,e,n)=>{n.r(e),n.d(e,{default:()=>R});var t=n(64015),l=n(72757),s=n(12926),o=n(46715),i=n.n(o);let d=Number(process.env.WORK_FACTOR)||13,c=(0,t.pb)({access:l.Du,fields:{name:(0,s.fL)(),nameLast:(0,s.fL)(),authId:(0,s.fL)({isIndexed:"unique"}),email:(0,s.fL)({validation:{isRequired:!0},isIndexed:"unique"}),password:(0,s.fL)({hooks:{beforeOperation:async({operation:a,resolvedData:e})=>{if("create"===a||"update"===a){if(console.log({resolvedData:e}),!e?.password)return console.log("no password set");let a=await i().hash(e?.password,d);console.log({password:e?.password,hash:a}),e.password=a}}}}),image:(0,s.fL)(),role:(0,s.bM)({ref:"Role.assignedTo"}),posts:(0,s.bM)({ref:"Post.author",many:!0}),createdAt:(0,s.AB)({defaultValue:{kind:"now"}})}}),r={canManageProducts:(0,s.MJ)({defaultValue:!1,label:"Manage Products: Can update and delete any product"}),canManageAddons:(0,s.MJ)({defaultValue:!1,label:"Manage Add-ons: Can update and delete any addon"}),canManageBookings:(0,s.MJ)({defaultValue:!1,label:"Manage Bookings: Can update and delete any booking"}),canManageAvailability:(0,s.MJ)({defaultValue:!1,label:"Manage Availability: Can update and delete any availbility"}),canManageEvents:(0,s.MJ)({defaultValue:!1,label:"Manage Events: Can update and delete any event"}),canManageAnnouncements:(0,s.MJ)({defaultValue:!1,label:"Manage Events: Can update and delete any annoucement"}),canManageTickets:(0,s.MJ)({defaultValue:!1,label:"Manage Tickets: Can update and delete any Ticket"}),canSeeOtherUsers:(0,s.MJ)({defaultValue:!1,label:"View Users: Can query any User"}),canManageUsers:(0,s.MJ)({defaultValue:!1,label:"Manage Users: Can edit any User"}),canManageRoles:(0,s.MJ)({defaultValue:!1,label:"Manage Roles: Can create / read / update / delete any Role"}),canManageCart:(0,s.MJ)({defaultValue:!1,label:"Manage Cart: Can see and manage any Cart or Cart Item"}),canManageOrders:(0,s.MJ)({defaultValue:!1,label:"Manage Orders: Can see and manage any Order"}),canManageCategories:(0,s.MJ)({defaultValue:!1,label:"Manage Categories: Can see and manage any category"}),canManageTags:(0,s.MJ)({defaultValue:!1,label:"Manage Tags: Can see and manage any tag"}),canManageLocations:(0,s.MJ)({defaultValue:!1,label:"Manage Locations: Can see and manage any location"}),canManagePages:(0,s.MJ)({defaultValue:!1,label:"Manage Pages: Can see and manage any page"}),canManagePosts:(0,s.MJ)({defaultValue:!1,label:"Posts: view and manage all posts"}),canManageServices:(0,s.MJ)({defaultValue:!1,label:"Manage Services: Can see and manage any service"}),canManageSubscriptionPlans:(0,s.MJ)({defaultValue:!1,label:"Manage Subscription Plans: Can see and manage any Subscription Plan offered"}),canManageSubscriptionItems:(0,s.MJ)({defaultValue:!1,label:"Manage Subscription Item: Can see and manage any current running subscriptions"}),canManageCoupons:(0,s.MJ)({defaultValue:!1,label:"Manage Coupons: Can create / delete coupons"})},u=Object.keys(r),g=(0,t.pb)({access:l.Du,fields:{name:(0,s.fL)({validation:{isRequired:!0},isIndexed:"unique"}),...r,assignedTo:(0,s.bM)({hooks:{beforeOperation:async({operation:a,resolvedData:e,context:n})=>{"create"===a&&(e.assignedTo.connect={name:"client"})}},ref:"User.role",many:!0,ui:{itemView:{fieldMode:"edit"}}})}});var m=n(54173);let M=Object.fromEntries(u.map(a=>[a,function({session:e}){return!!e?.data.role?.[a]}])),p={...M},f={canManagePosts:({session:a})=>!!function({session:a}){return!!a}({session:a})&&(console.log("***** canManagePosts"),console.log({session:a}),!!p.canManagePosts({session:a})||{author:{id:{equals:a?.itemId}}})},b=(0,t.pb)({access:{filter:{query:f.canManagePosts,update:f.canManagePosts,delete:()=>!1},operation:{query:()=>!0,create:()=>!0,delete:()=>!0,update:()=>!0}},fields:{title:(0,s.fL)({validation:{isRequired:!0}}),content:(0,m.t)({formatting:!0,layouts:[[1,1],[1,1,1],[2,1],[1,2],[1,2,1]],links:!0,dividers:!0}),author:(0,s.bM)({ref:"User.posts",ui:{displayMode:"cards",cardFields:["name","email"],inlineEdit:{fields:["name","email"]},linkToItem:!0,inlineConnect:!0},many:!1})}});var y=n(56337);async function seedDemoData(a){if(!(await a.db.Role.count()>0)){for(let e of[{name:"admin",canManagePosts:!0,canManageUsers:!0,canManageRoles:!0},{name:"client"}])await a.db.Role.createOne({data:e}),console.log("+ ROLE CREATED => ",e.name);if(!(await a.db.User.count()>0)){for(let e of[{name:"Adam",authId:"adam@m.lan",email:"adam@m.lan",password:"adam@m.lan",role:{connect:{name:"admin"}}},{name:"Cindy",authId:"cindy@m.lan",email:"cindy@m.lan",password:"cindy@m.lan",role:{connect:{name:"client"}}},{name:"Eddy",authId:"eddy@m.lan",email:"eddy@m.lan",password:"eddy@m.lan",role:{connect:{name:"client"}}}])await a.db.User.createOne({data:e}),console.log("+ USER CREATED => ",e.email);if(!(await a.db.Post.count()>0))for(let e of[{title:"Sick Tricks",author:{connect:{email:"adam@m.lan"}}},{title:"Sick Flicks",author:{connect:{email:"adam@m.lan"}}},{title:"fluffy pillows Tricks",author:{connect:{email:"cindy@m.lan"}}},{title:"Hot Rods",author:{connect:{email:"eddy@m.lan"}}}])await a.db.Post.createOne({data:e}),console.log("+ POST CREATED => ",e.title)}}}n(45753).config();let C=process.env.DB_PROTOCOL,h=process.env.DB_USER,v=process.env.DB_PASSWORD,w=process.env.DB_DOMAIN,P=process.env.DB_PORT,V=process.env.DB_COLLECTION,O=C+"://"+h+":"+v+"@"+w+":"+P+"/"+V;console.log({DB_ENDPOINT:O});let R=(0,t.vc)({db:{provider:"postgresql",url:O,onConnect:async a=>{await seedDemoData(a)}},server:{port:3001},ui:{publicPages:["/api/auth/csrf","/api/auth/signin","/api/auth/callback","/api/auth/session","/api/auth/providers","/api/auth/signout","/api/auth/error","/api/auth/signin/github","/api/auth/callback/github","/api/auth/signin/credentials","/api/auth/callback/credentials"],pageMiddleware:async({wasAccessAllowed:a})=>{if(console.log(a),!a)return{kind:"redirect",to:"/api/auth/signin"}}},lists:{User:c,Role:g,Post:b},session:y.q})}};