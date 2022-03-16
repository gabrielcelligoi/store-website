
// Client facing scripts here
$(() => {


  $("#load-img").submit(function(event) {
    event.preventDefault();
    const url = document.getElementById("imgURL").value
    document.getElementById("hiddenImgUrl").value = url

    $.ajax({
      type: "POST",
      url: "/newlisting",
      data: url,
      success: loadImg(url)
    })
  })

  $(".dropbtn").click(function() {        //dropdown menu on header
    $(".menu").slideToggle();
  })



  const loadImg = function(url) {
    $("#imageContainer").empty()
    const $img = $(`<img id="loaded" src=${url}>`)
    $("#imageContainer").append($img)
  }


  $("#product1").click(function() {
    window.location.href = "/products/1"
  })

  $("#product2").click(function() {
    window.location.href = "/products/2"
  })

  $("#product3").click(function() {
    window.location.href = "/products/3"
  })



 $("#add-msg-btn").submit(function(event) {
   event.preventDefault()
   $("#msg-container").slideToggle();
 })



})

