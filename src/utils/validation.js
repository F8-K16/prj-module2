export function validateRegisterForm(data) {
  const errors = [];

  if (!data.email) {
    errors.push({
      field: "email-register",
      message: "Email không được bỏ trống.",
    });
  } else if (!/^\S+@\S+\.\S+$/.test(data.email)) {
    errors.push({ field: "email-register", message: "Email không hợp lệ." });
  }

  if (!data.name) {
    errors.push({
      field: "name-register",
      message: "Tên không được bỏ trống.",
    });
  }

  if (!data.password) {
    errors.push({
      field: "password-register",
      message: "Mật khẩu không được bỏ trống.",
    });
  } else if (data.password.length < 6) {
    errors.push({
      field: "password-register",
      message: "Mật khẩu phải từ 6 ký tự.",
    });
  }

  if (!data.confirmPassword) {
    errors.push({
      field: "confirmPassword-register",
      message: "Vui lòng nhập lại mật khẩu.",
    });
  } else if (data.password !== data.confirmPassword) {
    errors.push({
      field: "confirmPassword-register",
      message: "Mật khẩu không khớp.",
    });
  }

  return errors;
}

export function validateProfileForm(data) {
  const errors = [];

  if (!data.name) {
    errors.push({ field: "name", message: "Vui lòng nhập tên hiển thị" });
  }

  if (!data.email) {
    errors.push({ field: "email", message: "Vui lòng nhập email" });
  } else if (!/^\S+@\S+\.\S+$/.test(data.email)) {
    errors.push({ field: "email", message: "Email không hợp lệ" });
  }

  return errors;
}

export function validateChangePasswordForm(data) {
  const errors = [];

  if (!data.oldPassword) {
    errors.push({
      field: "oldPassword",
      message: "Vui lòng nhập mật khẩu hiện tại",
    });
  }

  if (!data.password) {
    errors.push({ field: "password", message: "Vui lòng nhập mật khẩu mới" });
  } else if (data.password.length < 6) {
    errors.push({
      field: "password",
      message: "Mật khẩu mới phải tối thiểu 6 ký tự",
    });
  } else if (data.password === data.oldPassword) {
    errors.push({
      field: "password",
      message: "Mật khẩu mới phải khác mật khẩu hiện tại",
    });
  }

  if (!data.confirmPassword) {
    errors.push({
      field: "confirmPassword",
      message: "Vui lòng nhập lại mật khẩu",
    });
  } else if (data.password !== data.confirmPassword) {
    errors.push({
      field: "confirmPassword",
      message: "Mật khẩu nhập lại không khớp",
    });
  }

  return errors;
}

export function showFieldErrors(errors) {
  document.querySelectorAll("[data-error]").forEach((el) => {
    el.classList.add("hidden");
    const span = el.querySelector("span");
    if (span) span.textContent = "";
  });

  errors.forEach((err) => {
    const el = document.querySelector(`[data-error="${err.field}"]`);
    if (el) {
      const span = el.querySelector("span");
      if (span) span.textContent = err.message;
      el.classList.remove("hidden");
    }
  });
}
