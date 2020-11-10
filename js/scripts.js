function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

$( ".avatar" ).hover(
  function() {
    $( this ).attr('src','/images/dadi-avatar_blink.png');
  }, function() {
    $( this ).attr('src','/images/dadi-avatar.png');
  }
);


$( ".u-url.u-uid" ).hover(
  function() {
    $( ".avatar" ).attr('src','/images/dadi-avatar_right.png');
  }, function() {
    $( ".avatar" ).attr('src','/images/dadi-avatar.png');
  }
);

$( "#sidebar a" ).hover(
  function() {
    $( ".avatar" ).attr('src','/images/dadi-avatar_down.png');
  }, function() {
    $( ".avatar" ).attr('src','/images/dadi-avatar.png');
  }
);
$( "a[href='/blog/']" ).hover(
    function() {
        $( this ).html('b<span class="blag">la</span>g');
    }, function() {
        $( this ).html('blog');
    }
);

$( ' .elsewhere a ').hover(
    function() {
        var height = $(' .tagline ').height();
        content = $(' .tagline ').html();
        $(' .tagline ').height(height);
        $( ' .tagline ' ).html( $( this ).attr('data-label') ) ;
    },
    function() {
        $(' .tagline ').css("height", "auto");
        $(' .tagline ').html( content );
    }
);

async function blinktimer() {
  async function blink() {
    var src = $(" .avatar ").attr('src');
    console.log("BLINK!");
    $(" .avatar ").attr('src','/images/dadi-avatar_blink.png');
    await sleep(150);
    $(" .avatar ").attr('src',src);
  }
  while (true) {
    var delay = Math.floor((Math.random() * 15000) + 0);
    await sleep(delay);
    blink();
  }
};

$( function() {
  blinktimer();
});
