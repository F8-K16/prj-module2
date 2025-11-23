export default function ProfilePage(user) {
  return `
      <div class="fixed inset-0 bg-cover bg-center bg-no-repeat" 
           style="background-image: url('/images/bg-primary.jpg'); z-index: -1;">

        <div class="container mx-auto flex justify-center items-center">
            <div class="form-wrapper">
                <form id="update-profile-form"
                      class="auth-form active-form mt-50 p-10 bg-white/10 backdrop-blur-xl rounded-xl shadow-xl border border-white/20">
                    
                    <h2 class="text-white font-semibold text-center text-xl mb-6">CẬP NHẬT THÔNG TIN</h2>

                    <div>
                        <label class="block text-sm text-white mb-1">Tên hiển thị</label>
                        <input name="name" value="${
                          user.name || ""
                        }" class="w-full px-4 py-2 rounded bg-white/70 focus:bg-white text-gray-800">
                        <div class="mt-1.5 hidden flex items-center gap-1 text-red-400 text-xs" data-error="name">
                            <i class="fa-solid fa-circle-exclamation" style="color: #f03d3d;"></i>
                            <span></span>
                        </div>
                    </div>

                    <div class="mt-6">
                        <label class="block text-sm text-white mb-1">Email</label>
                        <input name="email" value="${
                          user.email || ""
                        }" class="w-full px-4 py-2 rounded bg-white/70 focus:bg-white text-gray-800" type="email">
                         <div class="mt-1.5 hidden flex items-center gap-1 text-red-400 text-xs" data-error="email">
                            <i class="fa-solid fa-circle-exclamation" style="color: #f03d3d;"></i>
                            <span></span>
                        </div>
                    </div>
                    <button type="submit" class="block w-full mt-8 px-4 py-2 bg-black/80 text-white rounded-xl hover:bg-red-400 transition cursor-pointer">
                        Cập nhật
                    </button>
                </form>
            </div>
        </div>
      </div>
    `;
}
