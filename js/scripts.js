function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
/*
async function blink() {
  var src = $(" #header .avatar ").attr('src');
  console.log("BLINK!");
  $( "#header .avatar" ).attr('src','/images/dadi-avatar_blink.png');
  await sleep(150);
  $( "#header .avatar" ).attr('src',src);
}
*/

$( "#header .avatar" ).hover(
  function() {
    $( this ).attr('src','/images/dadi-avatar_blink.png');
  }, function() {
    $( this ).attr('src','/images/dadi-avatar.png');
  }
);

$( "#header .left" ).hover(
  function() {
    $( "#header .avatar" ).attr('src','/images/dadi-avatar_left.png');
  }, function() {
    $( "#header .avatar" ).attr('src','/images/dadi-avatar.png');
  }
);
$( "#header .right" ).hover(
  function() {
    $( "#header .avatar" ).attr('src','/images/dadi-avatar_right.png');
  }, function() {
    $( "#header .avatar" ).attr('src','/images/dadi-avatar.png');
  }
);

$( ".u-url.u-uid" ).hover(
  function() {
    $( "#header .avatar" ).attr('src','/images/dadi-avatar_right.png');
  }, function() {
    $( "#header .avatar" ).attr('src','/images/dadi-avatar.png');
  }
);
$( "body.home a[href='/blog']" ).hover(
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
    var src = $(" #header .avatar ").attr('src');
    console.log("BLINK!");
    $( "#header .avatar" ).attr('src','/images/dadi-avatar_blink.png');
    await sleep(150);
    $( "#header .avatar" ).attr('src',src);
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
