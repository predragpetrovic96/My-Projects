var avatars = {
	headerAvatar: '.header .avatar',
	postAvatar:  '.post .avatar',
	popup: '.popup_avatar',
	input: '#popup_avatar_image',
	confirm: '.popup_avatar .confirm',
	cancel: '.popup_avatar .cancel',
}

var nicknames = {
	headerNickname: '.header .nickname',
	postNickname: '.post .nickname',
	popup: '.popup_nickname',
	input: '#popup_nickname_input',
	confirm: '.popup_nickname .confirm',
	cancel: '.popup_nickname .cancel',
}

var posts = {
	image: '#image_input',
	text: '#text_input',
	confirm: '.post_form .confirm',
	headerAvatar: '.header .avatar',
	headerNickname: '.header .nickname',
	postsWrapper: '.posts_wrapper',
	likeButton: '.like_button',
	commentButton: '.comment_button',
	postComments: '.post_comments',
	commentForm: '.comment_form',
	comment: '.comment',
	commentAvatar: '.comment_avatar',
	commentNickname: '.comment_nickname',
	commentText: '.comment_text',
	commentConfirm : '.comment_form .confirm',
}

var backgrounds = {
	heroImage: '.hero_image',
	changeBgImage: '.change_bg_image',
	popup: '.popup_hero_image',
	input: '#popup_hero_image_input',
	confirm: '.popup_hero_image .confirm',
	cancel: '.popup_hero_image .cancel',
}

var follow = {
	follow: '.follow',
	followCount: '.follow_count',
}




popupAvatar(avatars);
popupNickname(nicknames);
post(posts);
background(backgrounds);
followers(follow);

function followers (options) {
	var follow = document.querySelector(options.follow);
	var followCount = document.querySelector(options.followCount);

	follow.addEventListener('click', function () {
		followCount.innerHTML = parseInt(followCount.innerHTML) + 1; 
	});
}


function background (options) {
	var heroImage = document.querySelector(options.heroImage);
	var changeBgImage = document.querySelector(options.changeBgImage);
	var popup = document.querySelector(options.popup);
	var input = document.querySelector(options.input);
	var confirm = document.querySelector(options.confirm);
	var cancel = document.querySelector(options.cancel);

	changeBgImage.addEventListener('click', function () {
		popup.classList.add('active');
	});

	confirm.addEventListener('click', function () {
		if (input.value == '') {
			alert('Please insert valid url')
		}

		else {
			heroImage.style.backgroundImage = 'url(' + input.value + ')';
			popup.classList.remove('active');
		}

	});

	cancel.addEventListener('click', function () {
		popup.classList.remove('active');
	});

}



function post(options) {
	var image = document.querySelector(options.image);
	var text = document.querySelector(options.text);
	var confirm = document.querySelector(options.confirm);
	var postsWrapper = document.querySelector(options.postsWrapper);
	var headerAvatar = document.querySelector(options.headerAvatar);
	var headerNickname = document.querySelector(options.headerNickname);
	var likeButton = document.querySelectorAll(options.likeButton);
	var commentButton = document.querySelectorAll(options.commentButton);
	var commentConfirm = document.querySelectorAll(options.commentConfirm);


	confirm.addEventListener('click', function () {
		if (image.value == '' && text.value == '') {
			alert('Please enter a valid post content');
		}
		else {
			var avatar = headerAvatar.src;
			var nickname = headerNickname.innerHTML;
			var postText = text.value.replace(/\n/g, '<br>');
			var postImage = image.value;
			var newPostHtml = '<div class="post">' +
								'<img class="avatar" src="' + avatar + '">' +
								'<h3 class="nickname">' + nickname +'</h3>' +
								'<div class="post_text">' + postText + '</div>' +
								'<img class="post_image" src="' + postImage + '">' +
								'<div class="like_button">' +
									'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"/></svg>' +
									'<span>0</span>' +
								'</div>' +
								'<div class="comment_button">' +
									'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/></svg>' +
									'<span>0</span>' +
								'</div>' +
								'<div class="post_comments">' +
								'</div>' +
								'<div class="comment_form">' +
									'<h4>Add New Comment:</h4>' +
									'<label>Avatar<input class="comment_avatar" autocomplete="off" type="" name=""></label>' +
									'<label>Nickname<input class="comment_nickname" autocomplete="off" type="" name=""></label>' +
									'<label>Comment<textarea class="comment_text" autocomplete="off"></textarea></label>' +
									'<button type="button" class="confirm">Confirm Comment</button>' +
								'</div>' +
							'</div>';
			postsWrapper.innerHTML = newPostHtml + postsWrapper.innerHTML;		
			var likeButton = document.querySelectorAll(options.likeButton);
			var commentButton = document.querySelectorAll(options.commentButton);
			var commentConfirm = document.querySelectorAll(options.commentConfirm);
			for (i = 0; i < commentConfirm.length; i++) {
				commentConfirm[i].addEventListener('click', commentConfirmClick);
			}

			for (i = 0; i < commentButton.length; i++) {
				commentButton[i].addEventListener('click', commentButtonClick);
			}

			for (i = 0; i < likeButton.length; i++) {
				likeButton[i].addEventListener('click', likeButtonClick);
			}

		};
				
	});

	for (i = 0; i < commentConfirm.length; i++) {
		commentConfirm[i].addEventListener('click', commentConfirmClick);
	}

	for (i = 0; i < commentButton.length; i++) {
		commentButton[i].addEventListener('click', commentButtonClick);
	}

	for (i = 0; i < likeButton.length; i++) {
		likeButton[i].addEventListener('click', likeButtonClick);
	}
	

	function commentButtonClick () {
		var commentForm = this.parentElement.querySelector(options.commentForm);
		if (commentForm.classList.contains('active')) {
			commentForm.classList.remove('active');
		}

		else {
			commentForm.classList.add('active');
			var formPosition = findPos(commentForm);
			window.scrollTo(0, formPosition.y);
		}
	};

	function likeButtonClick () {
		var count = this.querySelector('span');
		count.innerHTML = parseInt(count.innerHTML) + 1;
	};


	function commentConfirmClick() {
		var commentAvatar = this.parentElement.querySelector(options.commentAvatar);
		var commentNickname = this.parentElement.querySelector(options.commentNickname);
		var commentText = this.parentElement.querySelector(options.commentText);
		var postComments = this.parentElement.parentElement.querySelector(options.postComments);
		if (commentAvatar.value == '' || commentNickname.value == '' || commentText.value == '') {
			alert('Please enter valid comment content');
		}

		else {
			var commentAvatarValue = commentAvatar.value;
			var commentNicknameValue = commentNickname.value;
			var commentTextValue = commentText.value.replace(/\n/g, '<br>');
			var newComment = '<div class="comment">' +
								'<img src="' + commentAvatarValue + '">' +
								'<h3>'+ commentNicknameValue +'</h3>' +
								'<span>' + commentTextValue + '</span>' +
							'</div>';

			postComments.innerHTML = postComments.innerHTML + newComment;
			var counter = this.parentElement.parentElement.querySelector(options.commentButton + ' span');
			counter.innerHTML = parseInt(counter.innerHTML) + 1;
			var commentForm = this.parentElement;
			commentForm.classList.remove('active');
			commentAvatar.value = '';
			commentNickname.value = '';
			commentText.value = '';
		}
	}
	


	function findPos(obj) {
	    var curleft = 0, curtop = 0;
	    if (obj.offsetParent) {
	        do {
	            curleft += obj.offsetLeft;
	            curtop += obj.offsetTop;
	        } while (obj = obj.offsetParent);
	        return { x: curleft, y: curtop };
	    }
	    return undefined;
	}

}


function popupAvatar (options) {

	var headerAvatar = document.querySelector(options.headerAvatar);
	var popup = document.querySelector(options.popup);
	var input = document.querySelector(options.input);
	var confirm = document.querySelector(options.confirm);
	var cancel = document.querySelector(options.cancel);

	headerAvatar.addEventListener('click', function () {
		popup.classList.add('active');
	});

	confirm.addEventListener('click', function () {
		headerAvatar.src = input.value;

		var postAvatar = document.querySelectorAll(options.postAvatar);
		for (i = 0; i< postAvatar.length; i++) {
			postAvatar[i].src = input.value;
		}

		popup.classList.remove('active');
	});

	cancel.addEventListener('click', function() {
		popup.classList.remove('active');
	});
}

function popupNickname (options) {
	var headerNickname = document.querySelector(options.headerNickname);
	var popup = document.querySelector(options.popup);
	var input = document.querySelector(options.input);
	var confirm = document.querySelector(options.confirm);
	var cancel = document.querySelector(options.cancel);

	headerNickname.addEventListener('click', function () {
		popup.classList.add('active');
	});

	confirm.addEventListener('click', function () {
		headerNickname.innerHTML = input.value;

		var postNickname = document.querySelectorAll(options.postNickname);
		for (i = 0; i< postNickname.length; i++) {
			postNickname[i].innerHTML = input.value;
		}

		popup.classList.remove('active');
	});

	cancel.addEventListener('click', function() {
		popup.classList.remove('active');
	});
}


