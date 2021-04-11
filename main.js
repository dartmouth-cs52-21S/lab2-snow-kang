$("#calculate").on("click", function (e) {
  // gather all checked radio-button values into an array
  var choices = $("input[type='radio']:checked")
    .map(function (i, radio) {
      return $(radio).val();
    })
    .toArray();
  console.log(choices);
  // now you have an array of choices = ["valueofradiobox1", "valueofradiobox2", "valueofradiobox2"]
  // you'll need to do some calculations with this
  // a naive approach would be to just choose the most common option - seems reasonable

  $(".modal").show();
});

// When the user clicks on (x), close the modal
$(".close").on("click", function (e) {
  $(".modal").hide();
});

// When the user clicks anywhere outside of the modal, close it
$(window).on("click", function (e) {
  
  if (e.target == $(".modal")[0]) {
    $(".modal").hide();
  } else {
    console.log('test');
  }
});
