const DEFAULT_DATA = {
  name:"Arafat Hossain Alvi",
  headline:"Computer Science & Artificial Intelligence Student | AI Enthusiast | Digital Marketing Enthusiast",
  location:"Dhaka, Bangladesh",
  university:"Southeast University",
  graduation:"Expected 2030",
  email:"arafatalvi37@gmail.com",
  intro:"Passionate about Artificial Intelligence, digital marketing, technology, and entrepreneurship. I enjoy learning new skills, building digital projects, and exploring how technology can solve real-world problems.",
  about:"I am Arafat Hossain Alvi, a Computer Science student at Southeast University in Dhaka, Bangladesh, with a strong interest in Artificial Intelligence, digital marketing, technology, and entrepreneurship. I am developing my technical knowledge while exploring programming, web technologies, online business, and digital marketing. My goal is to combine technology and creativity to build useful digital solutions and eventually create something of my own.",
  degree:"Honours in Computer Science and Artificial Intelligence",
  educationText:"Southeast University · Dhaka, Bangladesh · Expected graduation in 2030.",
  careerGoal:"My long-term goal is to develop strong expertise in Artificial Intelligence and digital technology while growing my knowledge of digital marketing and entrepreneurship.",
  facebook:"https://www.facebook.com/arafat.alvi.566",
  instagram:"https://www.instagram.com/al_vin_29/?hl=en",
  techSkills:["HTML & CSS","JavaScript","Python","Computer Science Fundamentals","Web Development","Problem Solving"],
  aiSkills:["Artificial Intelligence","AI Tools & Applications","Generative AI","Machine Learning — Learning"],
  marketingSkills:["Social Media Marketing","Content Marketing","SEO","Facebook/Meta Marketing","Google Ads — Learning","Content Strategy"],
  projects:[
    {title:"Personal Portfolio Website", tech:"HTML · CSS · JavaScript", desc:"A responsive personal portfolio designed to showcase my education, skills, interests, projects, and professional journey.", status:"IN PROGRESS"},
    {title:"Digital Marketing Campaign", tech:"Social Media · Content Strategy", desc:"A practical project focused on content creation, audience engagement, and exploring digital marketing strategies.", status:"LEARNING & DEVELOPING"},
    {title:"University Project", tech:"Computer Science", desc:"An academic project that will apply computer science concepts to a practical problem. More details will be added as the project develops.", status:"UPCOMING"}
  ],
  journey:[
    {year:"2026",title:"Starting My Digital Journey",desc:"Building my personal portfolio and strengthening foundations in programming, web development, AI, and digital marketing."},
    {year:"2027",title:"Building Practical Projects",desc:"Creating AI and web projects while developing a stronger technical portfolio."},
    {year:"2028–2029",title:"Experience & Growth",desc:"Exploring internships, freelance opportunities, and practical experience in technology and digital marketing."},
    {year:"2030",title:"Graduation & Next Chapter",desc:"Completing my Honours degree in Computer Science and Artificial Intelligence and taking the next step toward a career in AI, digital technology, and entrepreneurship."}
  ]
};

let data = JSON.parse(localStorage.getItem("arafatPortfolioData")) || structuredClone(DEFAULT_DATA);

function render(){
  document.querySelectorAll("[data-field]").forEach(el=>{
    const key=el.dataset.field;
    if(data[key] !== undefined) el.textContent=data[key];
  });
  document.querySelectorAll("[data-list]").forEach(el=>{
    const key=el.dataset.list;
    el.innerHTML=data[key].map(x=>`<span>${x}</span>`).join("");
  });
  document.querySelectorAll("[data-link]").forEach(el=>{
    const key=el.dataset.link;
    if(key==="email"){el.href=`mailto:${data.email}`;el.textContent=data.email}
    else el.href=data[key];
  });
  document.getElementById("projects-list").innerHTML=data.projects.map((p,i)=>`
    <article class="project-card reveal visible">
      <span class="project-number">0${i+1} / PROJECT</span>
      <h3>${p.title}</h3><div class="tags"><span>${p.tech}</span></div>
      <p>${p.desc}</p><div class="project-status">STATUS: ${p.status}</div>
    </article>`).join("");
  document.getElementById("timeline-list").innerHTML=data.journey.map(j=>`
    <div class="timeline-item"><span class="timeline-year">${j.year}</span><h3>${j.title}</h3><p>${j.desc}</p></div>`).join("");
  document.title=`${data.name} | Portfolio`;
}
render();
document.getElementById("year").textContent=new Date().getFullYear();

const modal=document.getElementById("editor-modal"), form=document.getElementById("editor-form");
document.getElementById("edit-btn").onclick=()=>{
document.getElementById("edit-btn").onclick = () => {
  const password = prompt("Enter Password to Edit:");
  if (password === "19107") {
    modal.classList.add("show");
  } else {
    alert("Need access? Feel free to reach out to me for the password!");
  }
};
  Object.entries(data).forEach(([key,val])=>{
    const input=form.elements[key];
    if(input) input.value=Array.isArray(val)?val.join(", "):val;
  });
};
document.getElementById("close-editor").onclick=()=>modal.classList.remove("show");
modal.onclick=e=>{if(e.target===modal)modal.classList.remove("show")};

form.onsubmit=e=>{
  e.preventDefault();
  const fd=new FormData(form);
  ["name","headline","location","university","graduation","email","intro","about","degree","educationText","careerGoal","facebook","instagram"].forEach(k=>data[k]=fd.get(k).trim());
  ["techSkills","aiSkills","marketingSkills"].forEach(k=>data[k]=fd.get(k).split(",").map(x=>x.trim()).filter(Boolean));
  localStorage.setItem("arafatPortfolioData",JSON.stringify(data));
  render(); modal.classList.remove("show");
};

document.getElementById("reset-btn").onclick=()=>{
  if(confirm("Reset all editable information to the original version?")){
    data=structuredClone(DEFAULT_DATA);localStorage.removeItem("arafatPortfolioData");render();
    Object.entries(data).forEach(([key,val])=>{const input=form.elements[key];if(input)input.value=Array.isArray(val)?val.join(", "):val;});
  }
};

document.getElementById("export-btn").onclick=()=>{
  const blob=new Blob([JSON.stringify(data,null,2)],{type:"application/json"});
  const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="arafat-portfolio-backup.json";a.click();URL.revokeObjectURL(a.href);
};

const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")}),{threshold:.12});
document.querySelectorAll(".reveal").forEach(x=>observer.observe(x));

document.querySelector(".menu-toggle").onclick=()=>document.querySelector(".nav-links").classList.toggle("open");
