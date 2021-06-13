$('.edit').click(function() {
    console.log(this)
    const newContent = prompt('바꿀 내용을 입력하세요');
    const newTitle = prompt('바꿀 내용을 입력하세요');
    const newSubject = prompt('바꿀 내용을 입력하세요');

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

$('.delete').click(function() {
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