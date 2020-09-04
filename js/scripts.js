console.log("Loaded");
$( "body.home dl dt a" ).hover(
  function() {
      console.log("Hover");
    $( this ).parent().next().css("visibility","visible");
  }, function() {
    $( this ).parent().next().css("visibility","hidden");
  }
);

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
