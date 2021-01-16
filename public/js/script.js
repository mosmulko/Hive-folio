if (!Element.prototype.matches) {
  Element.prototype.matches = Element.prototype.msMatchesSelector
                                || Element.prototype.webkitMatchesSelector;
}

if (!Element.prototype.closest) {
  Element.prototype.closest = function (s) {
    let el = this;

    do {
      if (Element.prototype.matches.call(el, s)) return el;
      el = el.parentElement || el.parentNode;
    } while (el !== null && el.nodeType === 1);
    return null;
  };
}

function subHeaderChange() {
  const screenHeight = document.documentElement.clientHeight;
  const h3 = document.getElementById("subheader");

  if ((document.body.scrollTop > 0.35 * screenHeight && document.body.scrollTop < 1.3 * screenHeight)
    || (document.documentElement.scrollTop > 0.35 * screenHeight && document.documentElement.scrollTop < 1.3 * screenHeight)) {
    h3.textContent = "A little bit about us";
  } else if ((document.body.scrollTop >= 1.3 * screenHeight)
    || (document.documentElement.scrollTop >= 1.3 * screenHeight)) {
    h3.textContent = "Here's what we do best";
  } else if ((document.body.scrollTop < 0.35 * screenHeight)
    || (document.documentElement.scrollTop < 0.35 * screenHeight)) {
    h3.textContent = `Together we can transform any idea 
        into something extraordinary`;
  }
}

window.addEventListener("DOMContentLoaded", subHeaderChange, { once: true });

function subheaderThrottle() {
  let scrolling = false;
  document.addEventListener("scroll", () => { scrolling = true; }, { passive: true });
  setInterval(() => {
    if (scrolling) {
      scrolling = false;
      subHeaderChange();
    }
  }, 300);
}
subheaderThrottle();

// GALLERY SECTION

const gallery = (function () {
  const projects = {
    gallerySection: document.getElementById("gallery-section"),
    projectBlocks: document.querySelectorAll(".project-block"),
    textWrap: document.querySelectorAll(".text-wrapper"),
    imgDisplay: document.querySelectorAll("image"),
    nextBtns: document.querySelectorAll(".next"),
    previousBtns: document.querySelectorAll(".prev"),
    bigImages: document.getElementsByClassName("big"),
    images: {
      1: {
        id: document.getElementById("img1"),
        index: 0,
        allImages: ["https://upload.wikimedia.org/wikipedia/commons/9/96/New_york_times_building.jpg", "https://cdn.architecturelab.net/wp-content/uploads/2015/01/763e771c1010af535d20e42439b9c04e.jpg",
          "https://i.pinimg.com/originals/fa/4b/bb/fa4bbbeb0f382ef60452d3602a05b221.jpg"],
      },
      2: {
        id: document.getElementById("img2"),
        index: 0,
        allImages: ["https://upload.wikimedia.org/wikipedia/commons/9/96/New_york_times_building.jpg", "https://cdn.architecturelab.net/wp-content/uploads/2015/01/763e771c1010af535d20e42439b9c04e.jpg",
          "https://i.pinimg.com/originals/fa/4b/bb/fa4bbbeb0f382ef60452d3602a05b221.jpg"],
      },
      3: {
        id: document.getElementById("img3"),
        index: 0,
        allImages: ["https://upload.wikimedia.org/wikipedia/commons/9/96/New_york_times_building.jpg", "https://cdn.architecturelab.net/wp-content/uploads/2015/01/763e771c1010af535d20e42439b9c04e.jpg",
          "https://i.pinimg.com/originals/fa/4b/bb/fa4bbbeb0f382ef60452d3602a05b221.jpg"],
      },
      4: {
        id: document.getElementById("img4"),
        index: 0,
        allImages: ["https://upload.wikimedia.org/wikipedia/commons/9/96/New_york_times_building.jpg", "https://cdn.architecturelab.net/wp-content/uploads/2015/01/763e771c1010af535d20e42439b9c04e.jpg",
          "https://i.pinimg.com/originals/fa/4b/bb/fa4bbbeb0f382ef60452d3602a05b221.jpg"],
      },
      5: {
        id: document.getElementById("img5"),
        index: 0,
        allImages: ["https://upload.wikimedia.org/wikipedia/commons/9/96/New_york_times_building.jpg", "https://cdn.architecturelab.net/wp-content/uploads/2015/01/763e771c1010af535d20e42439b9c04e.jpg",
          "https://i.pinimg.com/originals/fa/4b/bb/fa4bbbeb0f382ef60452d3602a05b221.jpg"],
      },
    },
  };

  function changeDisplayedImage(target, num) {
    const { images } = projects;

    for (i in images) {
      const img = images[i];

      if (target.parentElement.parentElement.parentElement.getAttribute("id")
            === img.id.parentElement.parentElement.parentElement.getAttribute("id")) {
        img.index += num;

        // INFINITE CLICKING
        if (img.index === img.allImages.length) {
          img.index = 0;
        } else if (img.index < 0) {
          img.index = img.allImages.length - 1;
        }

        // LIMITED CLICKING
        // if (img.index === img.allImages.length) {
        //     img.index = img.allImages.length-1
        // } else if (img.index === -1) {
        //     img.index = 0;
        // }
      }

      img.id.setAttribute("xlink:href", img.allImages[img.index]);
    }
  }

  projects.changeTitleOpacity = function (target) {
    this.textWrap.forEach((e) => {
      if (target.parentElement.parentElement.parentElement === e.parentElement) {
        e.firstElementChild.style.transitionDelay = "0s";
        e.lastElementChild.style.transitionDelay = "0.5s";
        e.firstElementChild.classList.add("hidden");
        e.lastElementChild.classList.add("visible");
        e.lastElementChild.style.visibility = "visible";
      } else if (target.parentElement === e.parentElement) {
        e.firstElementChild.style.transitionDelay = "0.5s";
        e.lastElementChild.style.transitionDelay = "0s";
        e.firstElementChild.classList.remove("hidden");
        e.lastElementChild.classList.remove("visible");
      }
    });
  };

  function positionInCenter(el) {
    const rect = el.getBoundingClientRect();
    const scrollY = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    const newscrollY = scrollY + rect.top;
    return newscrollY;
  }

  // first add raf shim
  // http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
  window.requestAnimFrame = (function () {
    return window.requestAnimationFrame
                || window.webkitRequestAnimationFrame
                || window.mozRequestAnimationFrame
                || function (callback) {
                  window.setTimeout(callback, 1000 / 60);
                };
  }());

  // main function
  function scrollToY(scrollTargetY, speed, easing) {
    // scrollTargetY: the target scrollY property of the window
    // speed: time in pixels per second
    // easing: easing equation to use

    const scrollY = window.scrollY || document.documentElement.scrollTop;
    var scrollTargetY = scrollTargetY || 0;
    var speed = speed || 2000;
    var easing = easing || "easeOutSine";
    let currentTime = 0;

    // min time .1, max time .8 seconds
    const time = Math.max(0.1, Math.min(Math.abs(scrollY - scrollTargetY) / speed, 0.8));

    // easing equations from https://github.com/danro/easing-js/blob/master/easing.js
    const easingEquations = {
      easeOutSine(pos) {
        return Math.sin(pos * (Math.PI / 2));
      },
      easeInOutSine(pos) {
        return (-0.5 * (Math.cos(Math.PI * pos) - 1));
      },
      easeInOutQuint(pos) {
        if ((pos /= 0.5) < 1) {
          return 0.5 * Math.pow(pos, 5);
        }
        return 0.5 * (Math.pow((pos - 2), 5) + 2);
      },
    };

    // add animation loop
    function tick() {
      currentTime += 1 / 60;

      const p = currentTime / time;
      const t = easingEquations[easing](p);

      if (p < 1) {
        requestAnimFrame(tick);

        window.scrollTo(0, scrollY + ((scrollTargetY - scrollY) * t));
      } else {
        console.log("scroll done");
        window.scrollTo(0, scrollTargetY);
      }
    }

    // call it once to get started
    tick();
  }

  projects.addImageListeners = function () {
    this.nextBtns.forEach((e) => {
      e.addEventListener("click", () => { changeDisplayedImage(e, 1); });
    });

    this.previousBtns.forEach((e) => {
      e.addEventListener("click", () => { changeDisplayedImage(e, -1); });
    });

    this.imgDisplay.forEach((e) => {
      e.addEventListener("mouseover", () => {
        event.target.closest(".project-block").classList.add("hover");
      });

      e.addEventListener("mouseout", () => {
        event.target.closest(".project-block").classList.remove("hover");
      });

      e.addEventListener("click", () => {
        const parentDiv = event.target.closest("div");
        const blockDiv = event.target.closest(".project-block");
        parentDiv.classList.add("big");
        blockDiv.style.transitionDuration = "0.3s";
        blockDiv.classList.add("max");
        blockDiv.classList.remove("hover");
        event.target.classList.add("inactive");
        this.changeTitleOpacity(event.target);
        // blockDiv.scrollIntoView({
        //     behavior: 'smooth'
        // });
        scrollToY(positionInCenter(blockDiv), 2000, "easeInOutSine");
      });
    });
  };

  return {
    a: projects,
  };
}());

gallery.a.addImageListeners();

// GALLERY CALLBACKS
const options = {
  root: null,
  rootMargin: "0px",
  threshold: 0.5,
};

const options2 = {
  root: null,
  rootMargin: "0px",
  threshold: [0.2, 0.9],
};

const callbackPB = (entries) => {
  entries.map((entry) => {
    const ratio = entry.intersectionRatio;
    const { height } = entry.boundingClientRect;
    if (ratio < 0.9 && height === window.innerHeight) {
      for (e of gallery.a.bigImages) {
        if (e.parentElement === entry.target) {
          e.classList.remove("big");
          e.parentElement.style.transitionDuration = "1s";
          e.parentElement.classList.remove("max");
          gallery.a.changeTitleOpacity(e);
          e.parentElement.classList.remove("max");
          setTimeout(() => {
            e.children[1].firstElementChild.classList.remove("inactive");
          }, 1000);
        }
      }
    }
  });
};

const observerPB = new IntersectionObserver(callbackPB, options2);

gallery.a.projectBlocks.forEach((element) => {
  observerPB.observe(element);
});

// CONTACT SECTION

const contact = (function () {
  const cPage = {
    contactSection: document.getElementById("contact-section"),
    veLetters: document.getElementById("ve"),
  };

  const cForm = {
    form: document.getElementById("form"),
    submit: document.getElementById("submit"),
    inputBlocks: document.querySelectorAll(".input-block"),
    inputs: {
      name: document.getElementById("name-input"),
      company: document.getElementById("company-input"),
      description: document.getElementById("description-input"),
      budget: document.getElementById("budget-input"),
      timeframe: document.getElementById("timeframe-input"),
      email: document.getElementById("email-input"),
      phone: document.getElementById("phone-input"),
    },
    requiredInputs: [],
    emailInput: {
      value: "",
      errMsg: "wrong email format",
    },
    areNotEmpty() {
      const inputs = this.requiredInputs;
      let counter = 0;

      inputs.forEach((e) => {
        if (e.value.length === 1 && e.value[0] === " ") {
          e.value = "";
        } else if (e.value.length > 0) {
          counter++;
        }
      });

      return counter === inputs.length;
    },
  };

  const { submit } = cForm;
  const { inputs } = cForm;

  cForm.requiredInputs.push(inputs.name, inputs.company, inputs.description, inputs.budget, inputs.timeframe, inputs.email);

  function isEmailValid() {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(inputs.email.value)) {
      return true;
    }

    return false;
  }

  function activateSubmit() {
    let readyToSubmit = false;
    cForm.areNotEmpty() && isEmailValid()
      ? (submit.classList.add("active"), submit.classList.remove("disabled"), cPage.veLetters.classList.add("animate"), readyToSubmit = true)
      : submit.classList.contains("active")
        && (submit.classList.remove("active"), submit.classList.add("disabled"), cPage.veLetters.classList.remove("animate"), readyToSubmit = false);

    return readyToSubmit;
  }

  cForm.checkInputErrors = function () {
    if (activateSubmit()) {
      // return
      cForm.form.reset();
    } else {
      cForm.requiredInputs.forEach((e) => {
        if ((e.value.length > 0 && e !== inputs.email)
                || (e === inputs.email && isEmailValid())) {

        } else {
          if (e.getAttribute("placeholder") !== cForm.emailInput.errMsg) {
            updateErrPlaceholder(e);
          }
          e.parentElement.classList.add("error");
          e.parentElement.classList.remove("border");
        }
      });
    }
  };

  cForm.placeholders = {
    name: inputs.name.getAttribute("placeholder"),
    company: inputs.company.getAttribute("placeholder"),
    description: inputs.description.getAttribute("placeholder"),
    budget: inputs.budget.getAttribute("placeholder"),
    timeframe: inputs.timeframe.getAttribute("placeholder"),
    email: inputs.email.getAttribute("placeholder"),
    phone: inputs.phone.getAttribute("placeholder"),
  };

  function updateErrPlaceholder(input) {
    if (input.value.length === 0) {
      input.setAttribute("placeholder", "don't leave me empty!");
    } else if (input === inputs.email && !isEmailValid()) {
      cForm.emailInput.value = input.value;
      input.value = "";
      input.parentElement.classList.remove("filled");
      input.setAttribute("placeholder", cForm.emailInput.errMsg);
    }
  }

  function resetPlaceholder(target) {
    const { placeholders } = cForm;

    for (p in placeholders) {
      if (target.parentElement.parentElement.getAttribute("id") === p) {
        target.setAttribute("placeholder", placeholders[p]);
      }
    }
  }

  cForm.addInputListeners = function () {
    for (i in inputs) {
      inputs[i].addEventListener("focus", () => {
        const parent = event.target.parentElement;

        if (event.target.getAttribute("placeholder") === cForm.emailInput.errMsg) {
          event.target.value = cForm.emailInput.value;
        }

        if (!parent.matches(".filled")
                && !parent.matches(".border")
                && !parent.matches(".error")) {
          return;
        }
        if (parent.matches(".error")) {
          resetPlaceholder(event.target);
          parent.classList.remove("error");
        } else {
          parent.classList.remove("filled");
        }
        parent.classList.add("border");

        parent.classList.add("animate");
      });

      inputs[i].addEventListener("blur", () => {
        const parent = event.target.parentElement;

        if (!parent.matches(".border")) {

        } else if (event.target.value.length === 0) {
          parent.classList.remove("animate");
        } else {
          parent.classList.remove("border");
          parent.classList.add("filled");
        }
      });

      inputs[i].addEventListener("input", activateSubmit);
    }
  };

  return {
    a: cPage,
    b: cForm,
  };
}());

const callback = (entries) => {
  entries.map((entry) => {
    const miniConnect = document.getElementById("mini-connect");
    const hiveEmail = document.getElementById("hive-email");
    if (entry.isIntersecting) {
      contact.b.addInputListeners();
      contact.b.submit.addEventListener("click", contact.b.checkInputErrors);
      miniConnect.classList.add("invisible");
      hiveEmail.classList.remove("invisible");
    } else {
      miniConnect.classList.remove("invisible");
      hiveEmail.classList.add("invisible");
    }
  });
};

const callback2 = (entries) => {
  entries.forEach((entry) => {
    const ratio = entry.intersectionRatio;

    if (ratio > 0.5) {
      entry.target.classList.add("animate");
    } else {
      entry.target.classList.remove("animate");
    }
  });
};

const observer = new IntersectionObserver(callback, options);
const observer2 = new IntersectionObserver(callback2, options);
observer.observe(contact.a.contactSection);

contact.b.inputBlocks.forEach((e) => {
  observer2.observe(e);
});

window.addEventListener("DOMContentLoaded", () => {
  contact.b.inputBlocks.forEach((e) => {
    e.classList.add("hidden");
  });
}, { once: true });

const callbackConnect = (entries) => {
  entries.map((entry) => {
    const miniConnect = document.getElementById("mini-connect");
    if (entry.isIntersecting) {
      miniConnect.classList.add("invisible");
    } else {
      miniConnect.classList.remove("invisible");
    }
  });
};

const observerConnect = new IntersectionObserver(callbackConnect, options2);
observerConnect.observe(document.getElementById("connect-wrapper"));
