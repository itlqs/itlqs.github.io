// 导航栏交互
const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    // 汉堡菜单点击事件
    burger.addEventListener('click', () => {
        // 切换导航菜单
        nav.classList.toggle('nav-active');

        // 切换汉堡菜单动画
        burger.classList.toggle('toggle');

        // 导航链接动画
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
    });
};

// 平滑滚动
const smoothScroll = () => {
    const navLinks = document.querySelectorAll('.nav-links a, .footer-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // 关闭移动端菜单
                const nav = document.querySelector('.nav-links');
                const burger = document.querySelector('.burger');
                if (nav.classList.contains('nav-active')) {
                    nav.classList.remove('nav-active');
                    burger.classList.remove('toggle');
                }
                
                // 平滑滚动到目标位置
                window.scrollTo({
                    top: targetSection.offsetTop - 55,
                    behavior: 'smooth'
                });
            }
        });
    });
};

// 案例轮播，手机端生效
const caseSlider = () => {
    const dots = document.querySelectorAll('.dot');
    const slider = document.querySelector('.cases-slider');
    
    if (dots.length > 0 && slider) {
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                // 移除所有点的激活状态
                dots.forEach(d => d.classList.remove('active'));
                
                // 添加当前点的激活状态
                dot.classList.add('active');
                
                // 计算滚动位置
                const cardWidth = document.querySelector('.case-card').offsetWidth;
                const scrollPosition = index * (cardWidth + 30); // 30是gap值
                
                // 滚动到对应位置
                slider.scrollTo({
                    left: scrollPosition,
                    behavior: 'smooth'
                });
            });
        });
        
        // 监听滚动事件，更新激活的点
        slider.addEventListener('scroll', () => {
            const scrollPosition = slider.scrollLeft;
            const cardWidth = document.querySelector('.case-card').offsetWidth;
            const activeIndex = Math.round(scrollPosition / (cardWidth + 30));
            
            dots.forEach((dot, index) => {
                if (index === activeIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        });
    }

};

// 滚动动画
const scrollAnimation = () => {
    const sections = document.querySelectorAll('.section');
    
    window.addEventListener('scroll', () => {
        const triggerBottom = window.innerHeight * 0.8;
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            
            if (sectionTop < triggerBottom) {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }
        });
    });
    
    // 初始设置
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // 触发初始检查
    setTimeout(() => {
        window.dispatchEvent(new Event('scroll'));
    }, 100);
};

// 固定导航栏
const fixedNav = () => {
    const header = document.querySelector('header');
    const hero = document.querySelector('.hero');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '10px 0';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.padding = '15px 0';
            header.style.boxShadow = 'none';
        }
    });
};

// 主横幅标签页切换/模态框
const heroTabs = () => {
    const tabs = document.querySelectorAll('.hero-tabs .tab');
    const tabContents = document.querySelectorAll('.hero-tab-content .tab-pane');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // 移除所有标签的激活状态
            tabs.forEach(t => t.classList.remove('active'));
            
            // 添加当前标签的激活状态
            tab.classList.add('active');
            
            // 获取目标内容ID
            const targetId = tab.getAttribute('data-tab');
            
            // 隐藏所有内容
            tabContents.forEach(content => {
                content.classList.remove('active');
            });
            
            // 显示目标内容
            document.getElementById(targetId).classList.add('active');
        });
    });
    // 主横幅模态框相关
    const viewMoreButtons = document.querySelectorAll('.hero-tab-content .btn');
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.close-modal');
    // 显示模态框
    viewMoreButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault(); // 阻止默认行为
            const modalId = button.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden'; // 防止页面滚动
            }
        });
    });
    // 关闭模态框
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            if (modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto'; // 恢复页面滚动
            }
        });
    });
    // 点击模态框外部关闭
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
            document.body.style.overflow = 'auto'; // 恢复页面滚动
        }
    });

};

// 产品详情模态框
const productModal = () => {
    const productCards = document.querySelectorAll('.product-card');
    const modal = document.getElementById('productModal');
    const closeBtn = modal.querySelector('.close-modal');
    const productDetails = modal.querySelectorAll('.product-detail');

    let lastScrollPosition = 0; // 记录当前滚动位置--自适应滚动显示
    // 点击产品卡片显示详情
    productCards.forEach(card => {
        const viewBtn = card.querySelector('.view-details');
        viewBtn.addEventListener('click', () => {
            const productId = card.getAttribute('data-product');
            
            // 隐藏所有产品详情
            productDetails.forEach(detail => {
                detail.style.display = 'none';
            });
            
            // 显示当前产品详情
            document.getElementById(productId).style.display = 'block';
            
            // 显示模态框
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // 防止背景滚动

            // 记录当前滚动位置---
            lastScrollPosition = window.scrollY;
            // 获取产品展示模块的位置
            const productsSection = document.getElementById('products');
            // 获取该模块距离页面顶部的距离
            const productsTop = productsSection.offsetTop;
            // 滚动到产品展示模块
            window.scrollTo({
               top: productsTop,
               behavior: 'smooth'
            });
        });
    });
    
    // 关闭模态框
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // 恢复背景滚动
        
        // 回到原先的滚动位置
        window.scrollTo({
            top: lastScrollPosition,
            behavior: 'smooth'
        });
    });
    
    // 点击模态框外部关闭
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';

            // 回到原先的滚动位置
            window.scrollTo({
                top: lastScrollPosition,
                behavior: 'smooth'
            });
        }
    });
};

// 解决方案详情模态框
const solutionModal = () => {
    const solutionItems = document.querySelectorAll('.solution-item');
    const modal = document.getElementById('solutionModal');
    const closeBtn = modal.querySelector('.close-modal');
    const solutionDetails = modal.querySelectorAll('.solution-detail');

    let lastScrollPosition = 0;
    
    // 点击解决方案项显示详情
    solutionItems.forEach(item => {
        const viewBtn = item.querySelector('.view-solution-details');
        viewBtn.addEventListener('click', () => {
            const solutionId = item.getAttribute('data-solution');
            
            // 隐藏所有解决方案详情
            solutionDetails.forEach(detail => {
                detail.style.display = 'none';
            });
            
            // 显示当前解决方案详情
            document.getElementById(solutionId).style.display = 'block';
            
            // 显示模态框
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';

            // 记录当前滚动位置---
            lastScrollPosition = window.scrollY;
            // 获取解决方案模块的位置
            const solutionsSection = document.getElementById('solutions');
            // 获取该模块距离页面顶部的距离
            const solutionsTop = solutionsSection.offsetTop;
            // 滚动到解决方案模块
            window.scrollTo({
               top: solutionsTop,  // 设置页面滚动到解决方案模块的顶部
               behavior: 'smooth'  // 平滑滚动
            });
        });
    });
    
    // 关闭模态框
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';

        window.scrollTo({
            top: lastScrollPosition,  // 回到原先的滚动位置
            behavior: 'smooth'  // 平滑滚动
        });

    });
    
    // 点击模态框外部关闭
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';

            window.scrollTo({
            top: lastScrollPosition,  // 回到原先的滚动位置
            behavior: 'smooth'  // 平滑滚动
        });
        }
    });
};

// 案例详情模态框
const caseModal = () => {
    const caseCards = document.querySelectorAll('.case-card');
    const modal = document.getElementById('caseModal');
    const closeBtn = modal.querySelector('.close-modal');
    const caseDetails = modal.querySelectorAll('.case-detail');
    
    let lastScrollPosition = 0;
    // 点击案例卡片显示详情
    caseCards.forEach(card => {
        const viewBtn = card.querySelector('.view-case-details');
        viewBtn.addEventListener('click', () => {
            const caseId = card.getAttribute('data-case');
            
            // 隐藏所有案例详情
            caseDetails.forEach(detail => {
                detail.style.display = 'none';
            });
            
            // 显示当前案例详情
            document.getElementById(caseId).style.display = 'block';
            
            // 显示模态框
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';

            //模态框滚动相关
            lastScrollPosition = window.scrollY;
            const casesSection = document.getElementById('cases');
            const casesTop = casesSection.offsetTop;
            window.scrollTo({
                top: casesTop,
                behavior: 'smooth'
            })

        });
    });
    
    // 关闭模态框
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        // 回到原先的滚动位置
        window.scrollTo({
            top: lastScrollPosition,
            behavior: 'smooth'
        })
    });
    
    // 点击模态框外部关闭
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            // 回到原先的滚动位置
            window.scrollTo({
                top: lastScrollPosition,
                behavior: 'smooth'
            })
        }
    });
};

// 解决方案特性动画
const solutionFeaturesAnimation = () => {
    const features = document.querySelectorAll('.solution-features li');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });
    
    features.forEach((feature, index) => {
        feature.style.opacity = '0';
        feature.style.transform = 'translateY(20px)';
        feature.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
        observer.observe(feature);
    });
};

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', () => {
    navSlide();
    smoothScroll();
    caseSlider();
    scrollAnimation();
    fixedNav();
    heroTabs();
    productModal();
    solutionModal();
    caseModal();
    solutionFeaturesAnimation();
    
    // 添加CSS动画类
    document.body.classList.add('loaded');
}); 