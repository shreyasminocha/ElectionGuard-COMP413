import {get_optional} from "./utils";
import {encryptBallot, getQRCode, buildBallot, buildManifest} from "./API/APIUtils";
import { ErrorBallotInput } from "./API/typical_ballot_data";
import encryptedBallot from "./encrypted_result_hex.json";
import * as ballot from './AaronBallot/super_complex_ballot.json';

function downloadJson(exportName: string){
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(
    JSON.stringify(encryptedBallot, null, '\t'));
  const downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute("href",     dataStr);
  downloadAnchorNode.setAttribute("download", exportName + ".json");
  document.body.appendChild(downloadAnchorNode); // required for firefox
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}

get_optional(document.getElementById("prev2")).addEventListener("click", function () {
  get_optional(document.getElementById("step_1")).className = "step current";
  get_optional(document.getElementById("step_2")).className = "step";
  get_optional(document.getElementById("screen_1")).style.display = "contents";
  get_optional(document.getElementById("screen_2")).style.display = "none";
});

get_optional(document.getElementById("prev3")).addEventListener("click", function () {
  get_optional(document.getElementById("step_2")).className = "step current";
  get_optional(document.getElementById("step_3")).className = "step";
  if(document.querySelector('input[name="choice"]')){
    document.querySelectorAll('input[name="choice"]').forEach((elem) => {
      elem.removeAttribute("disabled");
    });
  }
  if(document.querySelector('input[name="secondary"]')){
    document.querySelectorAll('input[name="secondary"]').forEach((elem) => {
      elem.removeAttribute("disabled");
    });
  }
  get_optional(document.getElementById("review-btn")).style.display = "block";
  get_optional(document.getElementById("submit-btn")).style.display = "none";
  get_optional(document.getElementById("previous2")).style.display = "block";
  get_optional(document.getElementById("previous3")).style.display = "none";
});

get_optional(document.getElementById("next1")).addEventListener("click", function () {
  get_optional(document.getElementById("step_1")).className = "step done";
  get_optional(document.getElementById("step_2")).className = "step current";
  get_optional(document.getElementById("screen_1")).style.display = "none";
  get_optional(document.getElementById("screen_2")).style.display = "contents";
  if(document.querySelector('input[name="choice"]')){
    document.querySelectorAll('input[name="choice"]').forEach((elem) => {
        elem.addEventListener("click", function(){
          get_optional(document.getElementById("review-btn")).style.display = "block";
        });
    });
  }
});

get_optional(document.getElementById("next2")).addEventListener("click", function () {
  if(document.querySelector('input[name="choice"]')){
    document.querySelectorAll('input[name="choice"]').forEach((elem) => {
      elem.setAttribute('disabled', "true");
    });
  }
  if(document.querySelector('input[name="secondary"]')){
    document.querySelectorAll('input[name="secondary"]').forEach((elem) => {
      elem.setAttribute('disabled', "true");
    });
  }
  get_optional(document.getElementById("step_2")).className = "step done";
  get_optional(document.getElementById("step_3")).className = "step current";
  get_optional(document.getElementById("review-btn")).style.display = "none";
  get_optional(document.getElementById("submit-btn")).style.display = "block";
  get_optional(document.getElementById("previous2")).style.display = "none";
  get_optional(document.getElementById("previous3")).style.display = "block";
});


get_optional(document.getElementById("next3")).addEventListener("click", function () {
  console.log('buildBallot');
  const realBallot = buildBallot(ballot);
  console.log('buildManifest');
  const realManifest = buildManifest(ballot);
  console.log(realBallot)
  console.log(realManifest)
  // const fakeBallot = buildFakeBallot();
  const result = encryptBallot(realBallot, realManifest);
  if (result instanceof ErrorBallotInput) {
    console.log("error input!")
    return;
  }
  get_optional(document.getElementById("output")).innerHTML = result.hash;
  get_optional(document.getElementById("seed_nonce")).innerHTML = result.seed;
  get_optional(document.getElementById("qrcodeOutput")).replaceChildren(getQRCode(["Encryption Output: "+result.hash , "Encryption Seed: "+result.seed]));
  get_optional(document.getElementById("step_3")).className = "step done";
  get_optional(document.getElementById("step_4")).className = "step current";
  get_optional(document.getElementById("screen_2")).style.display = "none";
  get_optional(document.getElementById("screen_4")).style.display = "contents";
  alert("Downloading Encrypted Ballot! qwq");
  //Download an encrypted ballot json file.
  downloadJson("encrpted_ballot");


});
