async function addFuncToEditDel() {
    const editBtn = document.getElementById('edit-button');
    const deleteBtn = document.getElementById('delete-button');
    if (!editBtn || !deleteBtn) {
        console.error(`Edit or delete buttor elements not found!`);
        return;
    }
    editBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.location = `/edit/${editBtn.dataset.movieid}`;
    });
    deleteBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        const res = await fetch(`/delete/${deleteBtn.dataset.movieid}`, {
            method: 'DELETE'
        });
        window.location = res.url;
    });
}

addFuncToEditDel();