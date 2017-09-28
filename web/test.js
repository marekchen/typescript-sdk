//var Droi = window.Droi

var appId = 'kgotmbzhvdZZbRem9j0h9waEeAyhc0L7lQAAwKII';
var appKey = '-MKQdcd-PVbOrX2g9HCIdcE2P-kv_UMFXF2vKSbnvn4VOaNZLwqHBajZ_s28pAXl';

Droi.initialize(appId,appKey);
console.log(Droi._config.appId)
var DroiUser = Droi.User
console.log(DroiUser)
user = new DroiUser()
user.setUserId("chenpei1")
user.setPassword("chenpei")
//user.signUp();
//DroiUser.login("chenpei1","chenpei");
DroiUser.requestOtp("8613285145373","PHONE")