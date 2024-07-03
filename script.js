function fnffn(plus) {
  function yyyymmdd(date) {
    var year = date.getFullYear().toString().substring(0, 4);
    var month = (date.getMonth() + 1).toString().padStart(2, '0');
    var day = date.getDate().toString().padStart(2, '0');
    return year + month + day;
  }

  function yyyymmdd2(date) {
    var year = date.getFullYear();
    var month = (date.getMonth() + 1).toString().padStart(2, '0');
    var day = date.getDate().toString().padStart(2, '0');
    return `${year}년 ${month}월 ${day}일`;
  }

  let today = new Date();
  today.setDate(today.getDate() + plus);
  let adjustedDate = new Date(today);

  var desP = document.getElementById('des');
  desP.textContent = yyyymmdd2(adjustedDate);
  let date_string = yyyymmdd(adjustedDate);

  let api_key = "2b107498c6f84327b851e78793e9de30";
  let school_code = "7251040";
  let location_code = "D10";

  let lunch_url = `https://open.neis.go.kr/hub/mealServiceDietInfo?TYPE=JSON&ATPT_OFCDC_SC_CODE=${location_code}&SD_SCHUL_CODE=${school_code}&KEY=${api_key}&MLSV_YMD=${date_string}`;

  fetch(lunch_url)
    .then(response => {
      if (!response.ok) {
        throw new Error('네트워크 오류');
      }
      return response.json();
    })
    .then(data => {
      if (data.RESULT && data.RESULT.MESSAGE) {
        let message = data.RESULT.MESSAGE;
        if (message === "해당하는 데이터가 없습니다.") {
          let GoodELEMENT = document.querySelector('.menu');
          ["쉬는 날이네요 😆"].forEach(item => {
            let p = document.createElement('p');
            p.id = 'message';
            p.textContent = item;
            GoodELEMENT.appendChild(p);
          });
        }
      } else {
        let ddishNm = data.mealServiceDietInfo[1].row[0].DDISH_NM;
        let orplcInfo = data.mealServiceDietInfo[1].row[0].ORPLC_INFO;
        let calInfo = data.mealServiceDietInfo[1].row[0].CAL_INFO;
        let ntrInfo = data.mealServiceDietInfo[1].row[0].NTR_INFO;

        var GoodELEMENT = document.querySelector('.btn');

        var p = document.createElement('button');
        p.id = 'toggle';
        p.innerHTML = '자세히 보기';
        GoodELEMENT.appendChild(p);

        var GoodELEMENT = document.querySelector('.menu');

        var p = document.createElement('p');
        var ff = document.createElement('p');
        ff.id = 'ch';
        ff.innerHTML = '';
        p.innerHTML = ddishNm;

        GoodELEMENT.appendChild(ff);
        GoodELEMENT.appendChild(p);

        var GoodELEMENT = document.querySelector('.data');

        var p = document.createElement('p');
        var ff = document.createElement('p');
        ff.id = 'ch';
        ff.innerHTML = '칼로리';
        p.innerHTML = calInfo;
        GoodELEMENT.appendChild(ff);
        GoodELEMENT.appendChild(p);

        var p = document.createElement('p');
        var ff = document.createElement('p');
        ff.id = 'ch';
        ff.innerHTML = '영양 정보';
        p.innerHTML = ntrInfo;
        GoodELEMENT.appendChild(ff);
        GoodELEMENT.appendChild(p);

        var p = document.createElement('p');
        var ff = document.createElement('p');
        ff.id = 'ch';
        ff.innerHTML = '원산지 표시';
        p.innerHTML = orplcInfo;
        GoodELEMENT.appendChild(ff);
        GoodELEMENT.appendChild(p);

        let swich = "n";
        var dataDiv = document.querySelector('.data');
        var toggle = document.getElementById('toggle');
        dataDiv.style.display = "none";

        toggle.addEventListener('click', toggleDataDiv);

        function toggleDataDiv() {
          if (swich === "b") {
            swich = "n";
            dataDiv.style.display = "none";
            toggle.textContent = "자세히 보기";
          } else {
            swich = "b";
            dataDiv.style.display = "block";
            toggle.textContent = "간략히 보기";
          }
        }
      }
    })
    .catch(error => {
      let GoodELEMENT = document.querySelector('.menu');
      ["고장남"].forEach(item => {
        let p = document.createElement('p');
        p.id = 'message';
        p.textContent = item;
        GoodELEMENT.appendChild(p);
      });
    });
}

let awesome = 0;
fnffn(awesome);

const leftBtn = document.getElementById('leftbtn');
leftBtn.addEventListener('click', () => {
  awesome -= 1;
  const menuDiv = document.querySelector('.menu');
  const btnDiv = document.querySelector('.btn');
  const dataDiv = document.querySelector('.data');

  menuDiv.innerHTML = '';
  btnDiv.innerHTML = '';
  dataDiv.innerHTML = '';
  fnffn(awesome);
});

const rightBtn = document.getElementById('rightbtn');
rightBtn.addEventListener('click', () => {
  awesome += 1;
  const menuDiv = document.querySelector('.menu');
  const btnDiv = document.querySelector('.btn');
  const dataDiv = document.querySelector('.data');

  menuDiv.innerHTML = '';
  btnDiv.innerHTML = '';
  dataDiv.innerHTML = '';
  fnffn(awesome);
});

async function repo() {
    window.open('https://github.com/Gtwo2')
}
