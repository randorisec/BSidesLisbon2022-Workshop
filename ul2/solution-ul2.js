// UnCrackable-Level2.apk
// To trigger the strncmp function, we need to respect the expected length
// Example user input: randorisecAAAAAAAAAAAAA

Interceptor.attach (Module.findExportByName ( "libc.so", "strncmp"), {
    onEnter: function (args) {
        var param1 = Memory.readCString(args[0]);
        var param2 = Memory.readCString(args[1]);
        if (param1.startsWith("randorisec")) {
                console.log("Secret is: " +  param2);
        }
    }
});

Java.perform(function () {
  console.log("Starting uncrackable2...");

  var sysexit = Java.use("java.lang.System");
  sysexit.exit.implementation = function() {
    // We avoid exiting the application
    console.log("System.exit() function was called!");
  };
});
