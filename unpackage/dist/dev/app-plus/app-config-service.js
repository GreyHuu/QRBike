
var isReady=false;var onReadyCallbacks=[];
var __uniConfig = {"pages":["pages/map/map","pages/index/index","pages/login/login","pages/login/register","pages/login/forget","pages/mypage/mypage","pages/AddMoney/AddMoney"],"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"QRBike","navigationBarBackgroundColor":"#F8F8F8","backgroundColor":"#F8F8F8"},"renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"QRBike","compilerVersion":"2.6.16","entryPagePath":"pages/map/map","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/map/map","meta":{"isQuit":true},"window":{"navigationBarTitleText":"QRBike","titleNView":{"autoBackButton":false,"buttons":[{"text":"","fontSrc":"/static/iconfont.ttf","fontSize":"22px","float":"left"},{"text":"","fontSrc":"/static/iconfont.ttf","fontSize":"22px","float":"right"}]}}},{"path":"/pages/index/index","meta":{},"window":{"navigationBarTitleText":"QRBike"}},{"path":"/pages/login/login","meta":{},"window":{}},{"path":"/pages/login/register","meta":{},"window":{}},{"path":"/pages/login/forget","meta":{},"window":{}},{"path":"/pages/mypage/mypage","meta":{},"window":{"navigationBarTitleText":"QRBike","titleNView":{"autoBackButton":true}}},{"path":"/pages/AddMoney/AddMoney","meta":{},"window":{"navigationBarTitleText":"QRBike","titleNView":{"autoBackButton":true}}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
