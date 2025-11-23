import AppService from "../services/AppService";
import router from "../router/router";
import {
  validateRegisterForm,
  showFieldErrors,
  validateProfileForm,
  validateChangePasswordForm,
} from "../utils/validation";
import { loadNavbarUser } from "../utils/loadNavbarUser";
import { loadSidebarUser } from "../utils/loadSidebarUser";
import { Toast } from "../components/Toast";

function saveAuthData(data) {
  if (data.access_token) {
    localStorage.setItem("token", data.access_token);
  }
  if (data.refresh_token) {
    localStorage.setItem("refresh_token", data.refresh_token);
  }
  if (data.user) {
    localStorage.setItem("user", JSON.stringify(data.user));
  }
}

export async function registerHandle(e) {
  e.preventDefault();

  const payload = {
    email: document.querySelector("#email-register").value.trim(),
    name: document.querySelector("#name-register").value.trim(),
    password: document.querySelector("#password-register").value.trim(),
    confirmPassword: document
      .querySelector("#confirmPassword-register")
      .value.trim(),
  };

  const errors = validateRegisterForm(payload);
  if (errors.length > 0) {
    showFieldErrors(errors);
    return;
  }
  showFieldErrors([]);

  try {
    const data = await AppService.register(payload);
    saveAuthData(data);

    Toast.success("Đăng ký thành công!");
    router.navigate("/login?show=login");
  } catch (error) {
    const backend = error.response.data;
    if (backend.message === "Email already in use") {
      showFieldErrors([
        { field: "email-register", message: "Email đã tồn tại" },
      ]);
      return;
    }

    Toast.error("Đăng ký thất bại! Vui lòng thử lại.");
  }
}

export async function loginHandle(e) {
  e.preventDefault();

  const payload = {
    email: document.querySelector("#email-login").value.trim(),
    password: document.querySelector("#password-login").value.trim(),
  };

  const errors = [];
  if (!payload.email) {
    errors.push({ field: "email", message: "Vui lòng nhập email" });
  }
  if (!payload.password) {
    errors.push({ field: "password", message: "Vui lòng nhập mật khẩu" });
  }

  if (errors.length > 0) {
    showFieldErrors(errors);
    return;
  }
  showFieldErrors([]);

  try {
    const data = await AppService.login(payload);
    saveAuthData(data);

    await loadNavbarUser();
    loadSidebarUser();
    router.navigate("/");
    Toast.success("Đăng nhập thành công!");
  } catch (error) {
    Toast.error("Đăng nhập thất bại! Vui lòng thử lại.");
  }
}

export async function logoutHandle() {
  const token = localStorage.getItem("token");
  if (!token) {
    router.navigate("/login");
    return;
  }

  try {
    await AppService.logout(token);
    localStorage.removeItem("token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
    await loadNavbarUser();
    loadSidebarUser();
    router.navigate("/login");
    Toast.success("Đăng xuất thành công!");
  } catch (error) {
    Toast.error("Đăng xuất thất bại! Vui lòng thử lại.");
  }
}

export function updateProfileHandle() {
  const form = document.querySelector("#update-profile-form");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
    };

    const errors = validateProfileForm(data);
    if (errors.length > 0) {
      showFieldErrors(errors);
      return;
    }
    showFieldErrors([]);

    try {
      await AppService.updateProfile(data);
      router.navigate("/");
      Toast.success("Cập nhật thông tin thành công!");
    } catch (error) {
      const backend = error.response?.data;

      if (backend?.message === "Email already in use") {
        showFieldErrors([{ field: "email", message: "Email đã tồn tại" }]);
        return;
      }
      Toast.error("Cập nhật thông tin thất bại! Vui lòng thử lại.");
    }
  });
}

export function changePasswordHandle() {
  const form = document.querySelector("#change-password-form");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
      oldPassword: form.oldPassword.value.trim(),
      password: form.password.value.trim(),
      confirmPassword: form.confirmPassword.value.trim(),
    };

    const errors = validateChangePasswordForm(data);
    if (errors.length > 0) {
      showFieldErrors(errors);
      return;
    }
    showFieldErrors([]);

    try {
      await AppService.changePassword(data);
      router.navigate("/");
      Toast.success("Đổi mật khẩu thành công!");
    } catch (error) {
      const backend = error.response?.data;

      if (backend?.message === "Old password is incorrect") {
        showFieldErrors([
          {
            field: "oldPassword",
            message: "Mật khẩu hiện tại không chính xác",
          },
        ]);
        return;
      }
      Toast.error("Đổi mật khẩu thất bại! Vui lòng thử lại.");
    }
  });
}
