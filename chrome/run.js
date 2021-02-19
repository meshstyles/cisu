
const googleImageSearchPat = /^data:image\/|https:\/\/[a-z0-9\-]+.gstatic.com/

const getImageUrl = (info) => {
  if (googleImageSearchPat.test(info.srcUrl)) {
    return (new URL(info.linkUrl)).searchParams.get('imgurl')
  } else {
    return info.srcUrl
  }
}

const openNewInTab = (uri) => {
  var newURL = `https://yandex.com/images/search?rpt=imageview&url=${uri}`;
  chrome.tabs.create({ url: newURL });
}

const onClickRun = (info, tab) => {
  let imageUrl = getImageUrl(info)

  if (imageUrl === null) {
    alert('Sorry, We could not get the image URL')
  } else {
    openNewInTab(imageUrl)
  }
}

const ctxItemId = "asdtedkhljLKJopiuj00-9Jl;j"

chrome.contextMenus.create({
  id: ctxItemId,
  title: "open new tab",
  type: "normal",
  contexts: ["image"],
  enabled: true,
  onclick: onClickRun
})

