// logic login, register, lưu auth token

//Chọn ra Login hoặc Register form dựa vào formID
function showForm(formID) {
    document.querySelectorAll(".form-box").forEach(form => form.classList.remove("active"));
    document.getElementById(formID).classList.add("active");
}
