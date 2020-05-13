var user_list = [];

function load() {
  chrome.storage.sync.get("user_list", (items) => {
    user_list = JSON.parse(items.user_list);
  });
}

function save(email) {
  load();
  user_list.push(email);
  chrome.storage.sync.set({
    "user_list": user_list
  });
}

load();

(($) => {
  $(window).on("load", () => {
    let $email = $("#email");
    let $add = $("#add");
    let $user_list = $("#user-list");

    let show = () => {
      $user_list.empty();
      user_list.forEach(email => {
        if (email) {
          $user_list.append("<li>" + email + "</li>");
        }
      });
    };

    $add.on("click", () => {
      let email = $email.val();
      save(email);
      show();
      $email.val("");
    });

    show();
  });
})(jQuery);
