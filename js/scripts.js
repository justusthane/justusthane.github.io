console.log("Loaded");
$( "body.home dl dt a" ).hover(
  function() {
      console.log("Hover");
    $( this ).parent().next().css("visibility","visible");
  }, function() {
    $( this ).parent().next().css("visibility","hidden");
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
