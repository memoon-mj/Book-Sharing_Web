const main = {
    init: function () {
    const _this = this;
    document.getElementById("edit").onclick = function () {
        _this.write();
    };
    },
    write: function () {
    const post = {
        project_id: document.getElementById("project_id_").value,
        
    };
    console.log(project)
    axios.post("/project/modify", project).then(function (result) {
        if (result.data) {
        // 해당 주소에 접속한 결과값이 true이면 /board로 이동
        location.href = "/project/modify";
        console.log('success');
        alert("성공입니다.");
        } else {
        // 만약 false라면 오류입니다 라는 문구를 띄워줌.
        alert("오류입니다.");
        }
    });
    },
};

main.init();