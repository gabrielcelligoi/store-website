// Client facing scripts here
$(() => {
  $(".dropbtn").click(function() {        //dropdown menu on header
    $(".menu").slideToggle();
  })


  $("#load-img").submit(function(event) {
    event.preventDefault();
    const url = document.getElementById("imgURL").value
    $.ajax({
      type: "POST",
      url: "/img",
      data: url,
      success: loadImg(url)
    })
  })


  const loadImg = function(url) {
    $("#imageContainer").empty()
    const $img = $(`<img id="loaded" src=${url}>`)
    $("#imageContainer").append($img)
  }
})
