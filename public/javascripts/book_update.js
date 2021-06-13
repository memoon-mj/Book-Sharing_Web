$('.btn.btn-dark.edit').click(function() {
    console.log(this)
    const newTitle = prompt('제목을 입력하세요');
    const newSubject = prompt('주제를 입력하세요');
    const newContent = prompt('내용을 입력하세요');

    if (!newContent || !newTitle || !newSubject ) {
    return alert('내용을 반드시 입력하셔야 합니다');
    }
    try {
        const parent = $(this).parent().parent();
        const child = parent.children();
        const id = child[1].value;
        console.log(newContent, newTitle, newSubject, id);
        axios.patch(`/post/${id}`, { 
            id : id,
            content: newContent,
            title : newTitle,
            subject : newSubject,    });
    } catch (err) {
        console.error(err);
    }
});

$('.btn.btn-danger.delete').click(function() {
    console.log(this)
    try {
        const parent = $(this).parent().parent();
        const child = parent.children();
        const id = child[1].value;
        axios.delete(`/post/${id}`);
        alert('삭제되었습니다.')
    } catch(err) {
        console.error(err);
    }
});

$('.dropdown-item.state1').click(function() {
    try {
        const parent = $(this).parent().parent().parent().parent();
        const child = parent.children();
        const id = child[1].value;

        console.log(id);
        axios.patch(`/post/${id}/state1`, { 
            id : id,
            borrow: '빌려감',});
        alert('변경되었습니다.');
        location.href = '/submit';
    } catch(err) {
        console.error(err);
    }
});

$('.dropdown-item.state2').click(function() {
    try {
        const parent = $(this).parent().parent().parent().parent();
        const child = parent.children();
        const id = child[1].value;

        console.log(id);
        axios.patch(`/post/${id}/state2`, { 
            id : id,
            borrow: '빌려줄 수 있음',});
        alert('변경되었습니다.');
        location.href = '/submit';
    } catch(err) {
        console.error(err);
    }
});

$('.dropdown-item.state3').click(function() {
    try {
        const parent = $(this).parent().parent().parent().parent();
        const child = parent.children();
        const id = child[1].value;

        console.log(id);
        axios.patch(`/post/${id}/state3`, { 
            id : id,
            borrow: '빌려줄 수 없음',});
        alert('변경되었습니다.');
        location.href = '/submit';
    } catch(err) {
        console.error(err);
    }
});