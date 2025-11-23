export default function ChangePasswordPage() {
  return `
      <div class="fixed inset-0 bg-cover bg-center bg-no-repeat" 
           style="background-image: url('/images/bg-primary.jpg'); z-index: -1;">

        <div class="container mx-auto flex justify-center items-center">
            <div class="form-wrapper">
                <form id="change-password-form"
                      class="auth-form active-form mt-50 p-10 bg-white/10 backdrop-blur-xl rounded-xl shadow-xl border border-white/20">
                    
                    <h2 class="text-white font-semibold text-center text-xl mb-6">ĐỔI MẬT KHẨU</h2>

                    <div>
                        <label class="block text-sm text-white mb-1">Mật khẩu hiện tại</label>
                        <input type="password" name="oldPassword" class="w-full px-4 py-2 rounded bg-white/70 focus:bg-white text-gray-800">
                        <div class="mt-1.5 hidden flex items-center gap-1 text-red-400 text-xs" data-error="oldPassword">
                            <i class="fa-solid fa-circle-exclamation" style="color: #f03d3d;"></i>
                            <span></span>
                        </div>
                    </div>

                    <div class="mt-6">
                        <label class="block text-sm text-white mb-1">Mật khẩu mới</label>
                        <input type="password" name="password" class="w-full px-4 py-2 rounded bg-white/70 focus:bg-white text-gray-800">
                        <div class="mt-1.5 hidden flex items-center gap-1 text-red-400 text-xs" data-error="password">
                            <i class="fa-solid fa-circle-exclamation" style="color: #f03d3d;"></i>
                            <span></span>
                        </div>
                    </div>

                    <div class="mt-6">
                        <label class="block text-sm text-white mb-1">Xác nhận mật khẩu mới</label>
                        <input type="password" name="confirmPassword" class="w-full px-4 py-2 rounded bg-white/70 focus:bg-white text-gray-800">
                        <div class="mt-1.5 hidden flex items-center gap-1 text-red-400 text-xs" data-error="confirmPassword">
                            <i class="fa-solid fa-circle-exclamation" style="color: #f03d3d;"></i>
                            <span></span>
                        </div>
                    </div>
                    <button type="submit" class="block w-full mt-8 px-4 py-2 bg-black/80 text-white rounded-xl hover:bg-red-400 transition cursor-pointer">
                        Đổi mật khẩu
                    </button>
                </form>
            </div>
        </div>
      </div>
    `;
}
