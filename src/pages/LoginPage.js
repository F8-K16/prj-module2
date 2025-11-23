export default function LoginPage() {
  return `
      <div class="fixed inset-0 bg-cover bg-center bg-no-repeat" 
           style="background-image: url('/images/bg-primary.jpg'); z-index: -1;">

        <div class="relative z-10 container mx-auto flex justify-center items-center">
            <div class="form-wrapper">
                <!--  Login -->
                <form id="login-form"
                      class="auth-form active-form mt-50 p-10 bg-white/10 backdrop-blur-xl rounded-xl shadow-xl border border-white/20">
                    
                    <h2 class="text-white font-semibold text-center text-xl mb-6">ĐĂNG NHẬP</h2>

                    <div>
                        <label class="block text-sm text-white mb-1">Email</label>
                        <input id="email-login" class="w-full px-4 py-2 rounded bg-white/70 focus:bg-white text-gray-800" type="email" placeholder="Email của bạn">
                        <div class="mt-1.5 hidden flex items-center gap-1 text-red-400 text-xs" data-error="email">
                            <i class="fa-solid fa-circle-exclamation" style="color: #f03d3d;"></i>
                            <span></span>
                        </div>
                    </div>

                    <div class="mt-6">
                        <label class="block text-sm text-white mb-1">Mật khẩu</label>
                        <input id="password-login" class="w-full px-4 py-2 rounded bg-white/70 focus:bg-white text-gray-800" type="password" placeholder="Mật khẩu">
                         <div class="mt-1.5 hidden flex items-center gap-1 text-red-400 text-xs" data-error="password">
                            <i class="fa-solid fa-circle-exclamation" style="color: #f03d3d;"></i>
                            <span></span>
                        </div>
                    </div>
                    <button type="submit" class="block w-full mt-8 px-4 py-2 bg-black/80 text-white rounded-xl hover:bg-red-400 transition cursor-pointer">
                        Đăng nhập
                    </button>
                    <div class="mt-10 flex items-center justify-center gap-1">
                        <span class="text-gray-500 text-sm">Bạn chưa có tài khoản?</span>
                        <button id="go-register" type="button" 
                                class="text-sm text-white hover:text-red-400 underline font-semibold cursor-pointer">
                            Đăng ký
                        </button>
                    </div>
                       
                </form>

                <!-- Register -->
                <form id="register-form"
                      class="auth-form hidden-form mt-40 p-10 bg-white/10 backdrop-blur-xl rounded-xl shadow-xl border border-white/20">

                    <h2 class="text-white font-semibold text-center text-xl mb-6">ĐĂNG KÝ</h2>

                    <div>
                        <label class="block text-sm text-white mb-1">Email</label>
                        <input id="email-register" class="w-full px-4 py-2 rounded bg-white/70 focus:bg-white text-gray-800"
                               type="email" placeholder="Email của bạn">

                        <div class="mt-1.5 hidden flex items-center gap-1 text-red-400 text-xs" data-error="email-register">
                            <i class="fa-solid fa-circle-exclamation" style="color: #f03d3d;"></i>
                            <span></span>
                        </div>
                    </div>


                    <div class="mt-6">
                        <label class="block text-sm text-white mb-1">Tên hiển thị</label>
                        <input id="name-register" class="w-full px-4 py-2 rounded bg-white/70 focus:bg-white text-gray-800"
                               type="text" placeholder="Tên hiển thị của bạn">
                        <div class="mt-1.5 hidden flex items-center gap-1 text-red-400 text-xs" data-error="name-register">
                            <i class="fa-solid fa-circle-exclamation" style="color: #f03d3d;"></i>
                            <span></span>
                        </div>
                    </div>

                    <div class="mt-6">
                        <label class="block text-sm text-white mb-1">Mật khẩu</label>
                        <input id="password-register" class="w-full px-4 py-2 rounded bg-white/70 focus:bg-white text-gray-800"
                               type="password" placeholder="Mật khẩu">
                        <div class="mt-1.5 hidden flex items-center gap-1 text-red-400 text-xs" data-error="password-register">
                            <i class="fa-solid fa-circle-exclamation" style="color: #f03d3d;"></i>
                            <span></span>
                        </div>
                    </div>

                    <div class="mt-6">
                        <label class="block text-sm text-white mb-1">Nhập lại mật khẩu</label>
                        <input id="confirmPassword-register" class="w-full px-4 py-2 rounded bg-white/70 focus:bg-white text-gray-800"
                               type="password" placeholder="Nhập lại mật khẩu">
                        <div class="mt-1.5 hidden flex items-center gap-1 text-red-400 text-xs" data-error="confirmPassword-register">
                            <i class="fa-solid fa-circle-exclamation" style="color: #f03d3d;"></i>
                            <span></span>
                        </div>
                    </div>

                   <button type="submit" class="block w-full mt-8 px-4 py-2 bg-black/80 text-white rounded-xl hover:bg-red-400 transition cursor-pointer">
                        Đăng ký
                    </button>
                    <div class="mt-10 flex items-center justify-center gap-1">
                        <span class="text-gray-500 text-sm">Bạn đã có tài khoản?</span>
                        <button id="go-login" type="button" 
                                class="text-sm text-white hover:text-red-400 underline font-semibold cursor-pointer">
                            Đăng nhập
                        </button>
                    </div>
                </form>

            </div>
        </div>
      </div>
    `;
}
