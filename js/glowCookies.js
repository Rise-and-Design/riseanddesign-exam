/*
    GLOW COOKIES
    CREATED BY MANUEL CARRILLO
    https://github.com/manucaralmo/GlowCookies
    2021 - v 3.1.3
*/

class GlowCookies {
  constructor() {
    // Cookies banner
    this.banner = undefined
    // Config
    this.config = undefined
    this.tracking = undefined
    // DOM ELEMENTS
    this.PreBanner = undefined
    this.Cookies = undefined
    this.DOMbanner = undefined
  }

  render() {
    this.addCss()
    this.createDOMElements()
    this.checkStatus()
  }

  addCss() {
    const stylesheet = document.createElement('link');
    stylesheet.setAttribute('rel', 'stylesheet');
    document.head.appendChild(stylesheet);
  }

  createDOMElements() {
    // COOKIES BUTTON
    this.PreBanner = document.createElement("div");
    this.PreBanner.innerHTML = ``;
    this.PreBanner.style.display = "none";
    document.body.appendChild(this.PreBanner);

    // COOKIES BANNER
    this.Cookies = document.createElement("div");
    this.Cookies.innerHTML = `<div 
                                    id="glowCookies-banner" 
                                    class="cookie-banner"
                                    style="background-color: ${this.banner.background};"
                                >
                                    <h3 class="primary-heading">${this.banner.heading}</h3>
                                    <p class="main-text">
                                        ${this.banner.description} 
                                        <br>
                                        <a 
                                            href="${this.banner.link}"
                                            target="_blank" 
                                            class="read__more"
                                            style="color: ${this.banner.color};"
                                        >
                                            ${this.banner.linkText}
                                        </a>
                                    </p>
                                    <div class="cookie-btn-container">
                                        <button type="button" id="acceptCookies" class="primary-cta-btn cookies-btn accept-cookies">
                                            ${this.banner.acceptBtn.text}
                                        </button>
                                        <button type="button" id="rejectCookies" class="secondary-cta-btn cookies-btn reject-cookies">
                                            ${this.banner.rejectBtn.text}
                                        </button>
                                    </div>
                                </div>
                            `;
    document.body.appendChild(this.Cookies);
    this.DOMbanner = document.getElementById('glowCookies-banner')


    // SET EVENT LISTENERS
    document.getElementById('prebannerBtn').addEventListener('click', () => this.openSelector())
    document.getElementById('acceptCookies').addEventListener('click', () => this.acceptCookies())
    document.getElementById('rejectCookies').addEventListener('click', () => this.rejectCookies())
  }

  checkStatus() {
    switch (localStorage.getItem("GlowCookies")) {
      case "1":
        this.openManageCookies();
        this.activateTracking();
        this.addCustomScript();
        break;
      case "0":
        this.openManageCookies();
        break;
      default:
        this.openSelector();
    }
  }

  openManageCookies() {
    this.PreBanner.style.display = this.config.hideAfterClick ? "none" : "block"
    this.DOMbanner.classList.remove('glowCookies__show')
  }

  openSelector() {
    this.PreBanner.style.display = "none";
    this.DOMbanner.classList.add('glowCookies__show')
  }

  acceptCookies() {
    localStorage.setItem("GlowCookies", "1")
    this.openManageCookies()
    this.activateTracking()
    this.addCustomScript()
  }

  rejectCookies() {
    localStorage.setItem("GlowCookies", "0");
    this.openManageCookies();
    this.disableTracking();
  }

  activateTracking() {
    // Google Analytics Tracking
    if (this.tracking.AnalyticsCode) {
      let Analytics = document.createElement('script');
      Analytics.setAttribute('src', `https://www.googletagmanager.com/gtag/js?id=${this.tracking.AnalyticsCode}`);
      document.head.appendChild(Analytics);
      let AnalyticsData = document.createElement('script');
      AnalyticsData.text = `window.dataLayer = window.dataLayer || [];
                                function gtag(){dataLayer.push(arguments);}
                                gtag('js', new Date());
                                gtag('config', '${this.tracking.AnalyticsCode}');`;
      document.head.appendChild(AnalyticsData);
    }
  }

  disableTracking() {
    // Google Analytics Tracking ('client_storage': 'none')
    if (this.tracking.AnalyticsCode) {
      let Analytics = document.createElement('script');
      Analytics.setAttribute('src', `https://www.googletagmanager.com/gtag/js?id=${this.tracking.AnalyticsCode}`);
      document.head.appendChild(Analytics);
      let AnalyticsData = document.createElement('script');
      AnalyticsData.text = `window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', '${this.tracking.AnalyticsCode}' , {
                            'client_storage': 'none',
                            'anonymize_ip': true
                        });`;
      document.head.appendChild(AnalyticsData);
    }

    // Clear cookies - not working 100%
    this.clearCookies()
  }

  clearCookies() {
    let cookies = document.cookie.split("; ");
    for (let c = 0; c < cookies.length; c++) {
      let d = window.location.hostname.split(".");
      while (d.length > 0) {
        let cookieBase = encodeURIComponent(cookies[c].split(";")[0].split("=")[0]) + '=; expires=Thu, 01-Jan-1970 00:00:01 GMT; domain=' + d.join('.') + ' ;path=';
        let p = location.pathname.split('/');
        document.cookie = cookieBase + '/';
        while (p.length > 0) {
          document.cookie = cookieBase + p.join('/');
          p.pop();
        };
        d.shift();
      }
    }
  }

  addCustomScript() {
    if (this.tracking.customScript !== undefined) {
      let customScriptTag

      this.tracking.customScript.forEach(script => {
        if (script.type === 'src') {
          customScriptTag = document.createElement('script');
          customScriptTag.setAttribute('src', script.content);
        } else if (script.type === 'custom') {
          customScriptTag = document.createElement('script');
          customScriptTag.text = script.content;
        }

        if (script.position === 'head') {
          document.head.appendChild(customScriptTag);
        } else {
          document.body.appendChild(customScriptTag);
        }
      })
    }
  }

  start(languaje, obj) {
    if (!obj) obj = {}
    const lang = new LanguagesGC(languaje)

    this.config = {
      border: obj.border || 'border',
      position: obj.position || 'left',
      hideAfterClick: obj.hideAfterClick || false,
      bannerStyle: obj.style || 2
    }

    this.tracking = {
      AnalyticsCode: obj.analytics || undefined,
      FacebookPixelCode: obj.facebookPixel || undefined,
      HotjarTrackingCode: obj.hotjar || undefined,
      customScript: obj.customScript || undefined
    }

    this.banner = {
      description: obj.bannerDescription || lang.bannerDescription,
      linkText: obj.bannerLinkText || lang.bannerLinkText,
      link: obj.policyLink || '#link',
      background: obj.bannerBackground || '#fff',
      color: obj.bannerColor || '#1d2e38',
      heading: obj.bannerHeading !== 'none' ? obj.bannerHeading || lang.bannerHeading : '',
      acceptBtn: {
        text: obj.acceptBtnText || lang.acceptBtnText,
        background: obj.acceptBtnBackground || '#253b48',
        color: obj.acceptBtnColor || '#fff'
      },
      rejectBtn: {
        text: obj.rejectBtnText || lang.rejectBtnText,
        background: obj.rejectBtnBackground || '#E8E8E8',
        color: obj.rejectBtnColor || '#636363'
      },
      manageCookies: {
        color: obj.manageColor || '#1d2e38',
        background: obj.manageBackground || '#fff',
        text: obj.manageText || lang.manageText,
      }
    }

    // Draw banner
    window.addEventListener('load', () => { this.render() })
  }
}

class LanguagesGC {
  constructor(code) {
    this.init()
    let lang = this.arrLang[code] || this.arrLang['en']
    this.bannerHeading = lang['bannerHeading']
    this.bannerDescription = lang['bannerDescription']
    this.bannerLinkText = lang['bannerLinkText']
    this.acceptBtnText = lang['acceptBtnText']
    this.rejectBtnText = lang['rejectBtnText']
    this.manageText = lang['manageText']
  }

  init() {
    this.arrLang = {
      af: {
        'bannerHeading': 'Ons gebruik koekies',
        'bannerDescription': 'Ons gebruik ons eie koekies en die van derdepartye, om inhoud te verpersoonlik en om webverkeer te ontleed.',
        'bannerLinkText': 'Lees meer oor koekies',
        'acceptBtnText': 'Aanvaar koekies',
        'rejectBtnText': 'Weier',
        'manageText': 'Koekie-instellings'
      },
      bg: {
        'bannerHeading': 'Ние използваме бисквитки',
        'bannerDescription': 'Използваме наши и бисквитки на трети страни, за да запазим Вашите предпочитания и да събираме аналитични данни.',
        'bannerLinkText': 'Прочетете повече за бисквитките',
        'acceptBtnText': 'Приеми бисквитките',
        'rejectBtnText': 'Откажи',
        'manageText': 'Настрой бисквитките'
      },
      de: {
        'bannerHeading': 'Verwendung von Cookies',
        'bannerDescription': 'Wir nutzen Cookies (auch von Drittanbietern), um Inhalte zu personalisieren und Surfverhalten zu analysieren.',
        'bannerLinkText': 'Mehr über Cookies',
        'acceptBtnText': 'Cookies akzeptieren',
        'rejectBtnText': 'Ablehnen',
        'manageText': 'Cookies verwalten'
      },
      en: {
        'bannerHeading': 'We use cookies',
        'bannerDescription': 'We use our own and third-party cookies to personalize content and to analyze web traffic.',
        'bannerLinkText': 'Read more about cookies',
        'acceptBtnText': 'Accept cookies',
        'rejectBtnText': 'Reject',
        'manageText': 'Manage cookies'
      },
      sv: {
        'bannerHeading': 'Vi använder cookies',
        'bannerDescription' : 'Vi använder våra egna och tredjepartscookies för att personalisera innehåll och till statistik.',
        'bannerLinkText' : 'Läs mer om cookies',
        'acceptBtnText' : 'Acceptera cookies',
        'rejectBtnText' : 'Avslå',
        'manageText' : 'Hantera cookies'
      },
      no: {
        'bannerHeading': 'Vi benytter cookies',
        'bannerDescription' : 'Vi benytter våre egne og tredjepartscookies for å personalisere innehold og til statistikk.',
        'bannerLinkText' : 'Les mer om cookies',
        'acceptBtnText' : 'Aksepter cookies',
        'rejectBtnText' : 'Avslå',
        'manageText' : 'Håndter cookies'
      },
      da: {
        'bannerHeading': 'Vi bruger cookies',
        'bannerDescription' : 'Vi bruger vores egne og tredjepartscookies til at tilpasse indhold og måle statistik.',
        'bannerLinkText' : 'Læs mere om cookies',
        'acceptBtnText' : 'Accepter cookies',
        'rejectBtnText' : 'Afvis',
        'manageText' : 'Administrer cookies'
      },
      es: {
        'bannerHeading': 'Uso de cookies',
        'bannerDescription': 'Utilizamos cookies propias y de terceros para personalizar el contenido y para analizar el tráfico de la web.',
        'bannerLinkText': 'Ver más sobre las cookies',
        'acceptBtnText': 'Aceptar cookies',
        'rejectBtnText': 'Rechazar',
        'manageText': 'Cookies'
      },
      fr: {
        'bannerHeading': 'Nous utilisons des cookies',
        'bannerDescription': 'Nous utilisons nos propres cookies et ceux de tiers pour adapter le contenu et analyser le trafic web.',
        'bannerLinkText': 'En savoir plus sur les cookies',
        'acceptBtnText': 'Accepter les cookies',
        'rejectBtnText': 'Refuser',
        'manageText': 'Paramétrez les cookies'
      },
      it: {
        'bannerHeading': 'Utilizziamo i cookie',
        'bannerDescription': 'Utilizziamo cookie nostri e di terze parti per personalizzare il contenuto e analizzare il traffico web.',
        'bannerLinkText': 'Per saperne di più riguardo i cookie',
        'acceptBtnText': 'Accetta i cookie',
        'rejectBtnText': 'Rifiuta',
        'manageText': 'Gestisci i cookie'
      },
      mg: {
        'bannerHeading': 'Izahay dia mampiasa cookies',
        'bannerDescription': "Mampiasa ny cookies anay manokana sy ireo an'ny antoko fahatelo izahay hampifanarahana ny atiny sy hamakafaka ny fivezivezena amin'ny tranonkala.",
        'bannerLinkText': 'Maniry halala bebe kokoa momba ny cookies',
        'acceptBtnText': 'Manaiky ireo cookies',
        'rejectBtnText': 'Tsy mety',
        'manageText': 'Hamboarina ny cookies'
      },
      nl: {
        'bannerHeading': 'We gebruiken cookies',
        'bannerDescription': 'We gebruiken onze en third-party cookies om content te personaliseren en web traffic te analyseren.',
        'bannerLinkText': 'Lees meer over cookies',
        'acceptBtnText': 'Cookies accepteren',
        'rejectBtnText': 'Weigeren',
        'manageText': 'Cookies beheren'
      },
      oc: {
        'bannerHeading': 'Utilizam de cookies',
        'bannerDescription': 'Utilizam nòstres pròpris cookies e de cookies tèrces per adaptar lo contengut e analisar lo trafic web.',
        'bannerLinkText': 'Ne saber mai suls cookies',
        'acceptBtnText': 'Acceptar los cookies',
        'rejectBtnText': 'Refusar',
        'manageText': 'Configurar los cookies'
      },        
      pl: {
        'bannerHeading': 'Używamy plików cookie',
        'bannerDescription': 'Ta strona używa plików cookie - zarówno własnych, jak i od zewnętrznych dostawców, w celu personalizacji treści i analizy ruchu.',
        'bannerLinkText': 'Więcej o plikach cookie',
        'acceptBtnText': 'Zaakceptuj pliki cookie',
        'rejectBtnText': 'Odrzuć',
        'manageText': 'Ustawienia plików cookie'
      },
      pt_BR: {
        'bannerHeading': 'Uso de cookies',
        'bannerDescription': 'Usamos cookies próprios e de terceiros para personalizar o conteúdo e analisar o tráfego da web.',
        'bannerLinkText': 'Leia mais sobre os cookies',
        'acceptBtnText': 'Aceitar cookies',
        'rejectBtnText': 'Rejeitar',
        'manageText': 'Gerenciar cookies'
      },
      ru: {
        'bannerHeading': 'Позвольте использовать куки?',
        'bannerDescription': 'Мы используем собственные и сторонние куки для персонализации контента и анализа веб-трафика.',
        'bannerLinkText': 'Узнать больше про куки.',
        'acceptBtnText': 'Ок, используйте',
        'rejectBtnText': 'Не разрешаю',
        'manageText': 'Разрешите использовать куки?'
      },
      sk: {
        'bannerHeading': 'Používame cookies',
        'bannerDescription': 'Na prispôsobenie obsahu a analýzu webovej stránky používame vlastné cookies a cookies tretích strán.',
        'bannerLinkText': 'Čo sú cookies?',
        'acceptBtnText': 'Povoliť cookies',
        'rejectBtnText': 'Nepovoliť',
        'manageText': 'Spravovať cookies'
      },
      th: {
        'bannerHeading': 'Cookies',
        'bannerDescription': 'พวกเราใช้คุกกี้บุคคลที่สาม เพื่อปรับแต่งเนื้อหาและวิเคราะห์การเข้าชมเว็บ',
        'bannerLinkText': 'อ่านเพิ่มเติมเกี่ยวกับคุกกี้',
        'acceptBtnText': 'ยอมรับคุกกี้',
        'rejectBtnText': 'ปฏิเสธคุกกี้',
        'manageText': 'Cookies'
      },
      tr: {
        'bannerHeading': 'Çerez kullanımı',
        'bannerDescription': 'İçeriği kişiselleştirmek ve web trafiğini analiz etmek için kendi ve üçüncü taraf çerezlerimizi kullanıyoruz.',
        'bannerLinkText': 'Çerezler hakkında daha fazlasını okuyun',
        'acceptBtnText': 'Çerezleri kabul et',
        'rejectBtnText': 'Reddet',
        'manageText': 'Çerezleri yönet'
      },
      uk: {
        'bannerHeading': 'Ми використовуємо кукі',
        'bannerDescription': 'Ми використовуємо власні та сторонні cookie для персоналізації досвіду користування та аналізу веб-трафіку.',
        'bannerLinkText': 'Дізнайтеся більше про cookie',
        'acceptBtnText': 'Прийняти',
        'rejectBtnText': 'Відхилити',
        'manageText': 'Налаштування cookie'
      },
      ja: {
        'bannerHeading': 'Cookies を使用しています',
        'bannerDescription': '私たちは、コンテンツのパーソナライズやトラフィックの分析のために、独自およびサードパーティー製 Cookies を使用しています。',
        'bannerLinkText': 'Cookiesについて詳しく見る',
        'acceptBtnText': 'Cookiesを受け入れる',
        'rejectBtnText': '拒否',
        'manageText': 'cookies管理'
      },
      zh_TW: {
        'bannerHeading': '我們使用 Cookies',
        'bannerDescription' : '我們使用了自己和第三方的 cookies 來個人化您的內容和分析網頁的流量。',
        'bannerLinkText' : '閱讀更多關於 cookies',
        'acceptBtnText' : '同意 cookies',
        'rejectBtnText' : '拒絕',
        'manageText' : '管理 cookies'
      },
      zh: {
        'bannerHeading': '我们使用 Cookies',
        'bannerDescription': '我们使用了自己和第三方的 cookies 来个性化您的内容和分析网页的流量。',
        'bannerLinkText': '阅读更多关于 cookies',
        'acceptBtnText': '同意 cookies',
        'rejectBtnText': '拒绝',
        'manageText': '管理 cookies'
      }
    }
  }

}

const glowCookies = new GlowCookies()
