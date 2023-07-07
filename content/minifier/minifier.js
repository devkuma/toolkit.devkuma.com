$( function() {
  $( "#format").click(
    function() {
      try {
        setValue( minifier( getValue() ) );
      } catch( err ) {
        alert( "Your document is invalid" );
      }
    }
  );
  $( "#clear" ).click(
    function() {
      setValue( "" );
    }
  );
});