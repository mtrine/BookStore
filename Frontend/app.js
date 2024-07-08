// Hàm để lưu token vào localStorage
function saveTokens(accessToken, refreshToken) {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
}

// Hàm để lấy token từ localStorage
function getTokens() {
    return {
        accessToken: localStorage.getItem('accessToken'),
        refreshToken: localStorage.getItem('refreshToken')
    };
}

// Hàm để đăng nhập
async function login(username, password) {
    const response = await fetch('http://localhost:3000/v1/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });

    if (response.ok) {
        const data = await response.json();
        saveTokens(data.accessToken, data.refreshToken);
        console.log('Đăng nhập thành công');
    } else {
        console.log('Đăng nhập thất bại');
    }
}

// Hàm để làm mới Access Token
async function refreshToken() {
    const tokens = getTokens();

    const response = await fetch('http://localhost:3000/v1/auth/refresh', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ refreshToken: tokens.refreshToken })
    });

    if (response.ok) {
        const data = await response.json();
        saveTokens(data.accessToken, tokens.refreshToken);
        console.log('Token đã được làm mới');
    } else {
        console.log('Làm mới token thất bại, yêu cầu đăng nhập lại');
        // Redirect to login page or show login form
    }
}

// Hàm để kiểm tra và làm mới Access Token khi khởi động ứng dụng
async function initialize() {
    const tokens = getTokens();

    if (tokens.accessToken) {
        // Kiểm tra token hết hạn hay không (giả định hàm checkTokenExpiration tồn tại)
        if (checkTokenExpiration(tokens.accessToken)) {
            await refreshToken();
        } else {
            console.log('Access Token vẫn còn hiệu lực');
        }
    } else {
        console.log('Không tìm thấy Access Token, yêu cầu đăng nhập');
        // Redirect to login page or show login form
    }
}

// Giả định hàm để kiểm tra token hết hạn (bạn cần tự hiện thực)
function checkTokenExpiration(token) {
    // Decode JWT token và kiểm tra expiration time
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp < Date.now() / 1000;
}

// Khởi động ứng dụng
initialize();

document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    login(username, password);
});
