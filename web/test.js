//var Droi = window.Droi
function show() {
  // var a=document.getElementById("file").value;
  // document.getElementById("text").value=a;
  // console.log(a);
  // document.images[0].src=a;

  var fileUploadControl = $('#photoFileUpload')[0];
  if (fileUploadControl.files.length > 0) {
    var localFile = fileUploadControl.files[0];
    var name = 'avatar.jpg';
    console.log(localFile);
    var DroiFile = Droi.File
    var file = new DroiFile(name, localFile);
    file.save().then(
      (resp) => {
        console.log(resp);
      }
    );
  }
  // var DroiFile = Droi.File;
  // var file = new DroiFile();
  // file.setObjectId("59b744debf853676431d16f8");
  // file.fetch().then(
  //   (resp) => {
  //     console.log(resp);
  //   }
  // );

}

var appId = 'kgotmbzhvdZZbRem9j0h9waEeAyhc0L7lQAAwKII';
var appKey = '-MKQdcd-PVbOrX2g9HCIdcE2P-kv_UMFXF2vKSbnvn4VOaNZLwqHBajZ_s28pAXl';

// var appId = 'kgotmbzh1B8AXM7IGAMfiRBsKPMkoDMplQBYFAEA';
// var appKey = '245lACrLv6MdkSHCoi0Ebs5r2YOFUlcD8Vyh0FJm9jBKU3zYkv1GFVSB1Yx';

Droi.initialize(appId, appKey);
console.log(Droi._config.appId)
var DroiUser = Droi.User
console.log(DroiUser)
user = new DroiUser()
user.setUserId("chenpei1")
user.setPassword("chenpei")
//user.signUp();
//DroiUser.login("chenpei1","chenpei");
//DroiUser.requestOtp("8613285145373","PHONE")