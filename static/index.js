var top_header = document.getElementById("top_header");
var left_div = document.getElementById("left_div");
var contents_box = document.getElementById("contents_box");
var github = document.getElementById("github");
var ainize = document.getElementById("ainize");
var run_logo = document.getElementById("run");
var github_parent = github.parentNode;
var ainize_parent = ainize.parentNode;
var run_parent = run_logo.parentNode;
var logo = document.getElementById("logo");
var logos = document.getElementsByClassName("logos");
var setup_box = document.getElementById("setup_box");
var resized = false;
var profile_img = document.getElementById("profile_img");
var select = document.getElementById("model");
var twitter_name_span = document.getElementById("name");
var twitter_id_span = document.getElementById("id");
var content_text = document.getElementById("content");
var run_img_url = "../static/images/run_logo.svg";
var wait_img_url = "../static/images/waiting_logo.svg";
var is_running = false;
var initial_text =
  "Select a model and enter an initial text what you want to generate. Then, press the run button !";
var twitter_id = [
  "BarackObama",
  "BillGates",
  "DUALIPA",
  "elonmusk",
  "iamcardib",
  "JoeBiden",
  "ladygaga",
  "StephenKing",
  "tim_cook",
];
var twitter_name = [
  "Barack Obama",
  "Bill Gates",
  "DUA LIPA",
  "Elon Musk",
  "iamcardib",
  "Joe Biden",
  "Lady Gaga",
  "Stephen King",
  "Tim Cook",
];
var profile_id_name = {};

initial_setting();
resize_top_header();
model_selected();

function resize_top_header() {
  contents_box.style.marginLeft = left_div.offsetWidth + "px";
  resize_left_div();
}

function resize_left_div() {
  if (left_div.offsetWidth <= 275) {
    if (!resized) {
      for (const temp of logos) {
        temp.style.justifyContent = "flex-end";
      }
      setup_box.style.paddingLeft = "95px";
      logo.style.justifyContent = "flex-end";
      github_parent.removeChild(github);
      ainize_parent.removeChild(ainize);
      run_parent.removeChild(run_logo);
      resized = true;
    }
  } else {
    if (resized) {
      for (const temp of logos) {
        temp.style.justifyContent = "flex-start";
      }
      setup_box.style.paddingLeft = "30px";
      logo.style.justifyContent = "flex-start";
      github_parent.appendChild(github);
      ainize_parent.appendChild(ainize);
      run_parent.appendChild(run_logo);
      resized = false;
    }
  }
}

function initial_setting() {
  var i = 0;
  for (const id of twitter_id) {
    var option = document.createElement("option");
    model = id.toLowerCase();
    option.textContent = model;
    option.value = model;
    select.appendChild(option);
    profile_id_name[model] = [twitter_name[i], twitter_id[i]];
    i++;
  }
  content_text.innerText = initial_text;
  random_number();
}

function model_selected() {
  var url = "https://twivatar.glitch.me/";
  var model = select.options[select.selectedIndex].value;
  if (model == undefined) {
    url += "ai__network";
    profile_img.src = url;
    twitter_name_span.innerText = "AI Network";
    twitter_id_span.innerText = "@ai__network";
  } else {
    url += model;
    profile_img.src = url;
    var name = profile_id_name[model][0] + "_BOT";
    var id = profile_id_name[model][1] + "_BOT";
    twitter_name_span.innerText = name;
    twitter_id_span.innerText = "@" + id;
  }
}

function text_refresh() {
  content_text.innerText = initial_text;
}

function random_number() {
  var logo_texts = document.getElementsByClassName("logo_text_content");
  for (const logo_text of logo_texts) {
    var r = 9999 * Math.random() + 1;
    r = Math.floor(r);
    if (r >= 1000) {
      r = (r / 1000).toFixed(1);
      logo_text.innerText = r + "K";
    } else {
      logo_text.innerText = r + "";
    }
  }
}

function generate() {
  if (is_running) {
    alert("Already running! Please wait a seconds.");
    return;
  }
  is_running = true;
  document.getElementById("run_img").src = wait_img_url;
  const formData = new FormData();
  try {
    if (
      content_text.innerText == undefined ||
      select.options[select.selectedIndex].value == undefined ||
      document.getElementById("length").value == undefined
    ) {
      throw Error(
        "Please select a model and enter an initial text and enter a length."
      );
    }
  } catch (e) {
    content_text.innerHTML = e;
    document.getElementById("run_img").src = run_img_url;
    is_running = false;
    return;
  }

  const text = content_text.innerText;
  const model = select.options[select.selectedIndex].value;
  const length = document.getElementById("length").value;
  const num_samples = "1";

  formData.append("text", text);
  formData.append("num_samples", num_samples);
  formData.append("length", length);
  formData.append("model", model);

  fetch("https://main-gpt2-tweets-gmlee329.endpoint.ainize.ai/gpt2-tweets", {
    method: "POST",
    body: formData,
  })
    .then(async (response) => {
      if (response.status == 200) {
        return response;
      } else if (response.status == 413) {
        throw Error("This request is too large.");
      } else {
        throw Error((await response.clone().json()).message);
      }
    })
    .then((response) => response.json())
    .then((response) => {
      content_text.innerText = text + response["0"];
      document.getElementById("run_img").src = run_img_url;
      is_running = false;
      random_number();
    })
    .catch((e) => {
      content_text.innerHTML = e;
      document.getElementById("run_img").src = run_img_url;
      is_running = false;
    });
}
