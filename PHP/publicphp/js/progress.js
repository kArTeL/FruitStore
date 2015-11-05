function showProgress()
{
  $(".container").fadeOut(0, function() {
    $(".preload").fadeIn(0);
  });
}

function hideProgress()
{
  $(".preload").fadeOut(0, function() {
    $(".container").fadeIn(0);
  });
}
