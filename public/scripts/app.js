
// Client facing scripts here
$(() => {
  $(".dropbtn").click(function() {        //dropdown menu on header
    $(".menu").slideToggle();
  })


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



  const loadImg = function(url) {
    $("#imageContainer").empty()
    const $img = $(`<img id="loaded" src=${url}>`)
    $("#imageContainer").append($img)
  }

<<<<<<< HEAD
=======
  $("#product1").click(function() {
    window.location.href = "/products/1"
  })

  $("#product2").click(function() {
    window.location.href = "/products/2"
  })

  $("#product3").click(function() {
    window.location.href = "/products/3"
  })
>>>>>>> c01b0992dc401e57639e8c53ed636fe11b495cb2


})

