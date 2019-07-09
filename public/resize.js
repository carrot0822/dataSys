resizeCenter() {
    if (!window.screen.height || !window.screen.width) {
      return this.resizeCenterBak();
    }
    console.log("你还会执行吗");
    var ratio = $(window).height() / window.screen.height;
    $("body").css({
      transform: "scale(" + ratio + ")",
      transformOrigin: "left top",
      backgroundSize:
        100 * ((window.screen.width / $(window).width()) * ratio) +
        "%" +
        " 100%",
      backgroundPosition:
        ($(window).width() - $("body").width() * ratio) / 2 + "px top",
      marginLeft: ($(window).width() - $("body").width() * ratio) / 2
    });
    console.log(
      "ratio",
      ratio,
      $(window).width(),
      window.screen.width,
      $("body").width()
    );
  },
  resizeCenterBak() {
    var ratioX = $(window).width() / $("body").width();
    var ratioY = $(window).height() / $("body").height();
    console.log($(window).height(), $("body").height(), "为啥除不尽");
    var ratio = Math.min(ratioX, ratioY);
    console.log("第二种", ratioX, ratioY);
    $("body").css({
      transform: "scale(" + ratio + ")",
      transformOrigin: "left top",
      backgroundSize: (1 / ratioX) * 100 * ratio + "%",
      backgroundPosition:
        ($(window).width() - $("body").width() * ratio) / 2 + "px top",
      marginLeft: ($(window).width() - $("body").width() * ratio) / 2
    });
    console.log(
      "ratio",
      ratio,
      $(window).width(),
      window.screen.width,
      $("body").width()
    );
  },
  resizeFull() {
    if (!window.screen.height || !window.screen.width)
      return this.resizeFullBak();
    var ratioX = $(window).width() / window.screen.width;
    var ratioY = $(window).height() / window.screen.height;
    $("body").css({
      transform: "scale(" + ratioX + ", " + ratioY + ")",
      transformOrigin: "left top",
      backgroundSize: "100% 100%"
    });
  },
  resizeFullBak() {
    var ratioX = $(window).width() / $("body").width();
    var ratioY = $(window).height() / $("body").height();
    $("body").css({
      transform: "scale(" + ratioX + ", " + ratioY + ")",
      transformOrigin: "left top",
      backgroundSize: "100% " + ratioY * 100 + "%"
    });
  }