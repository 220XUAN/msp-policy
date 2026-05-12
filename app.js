/**
 * 页面配置接口
 * @typedef {Object} PageContent
 * @property {string} title
 * @property {string} authors
 * @property {string} affiliation
 * @property {string} venue
 * @property {SectionItem[]} sections
 *
 * @typedef {Object} SectionItem
 * @property {string} id
 * @property {string} title
 * @property {2|3} [headingLevel]
 * @property {'text'|'image'|'video'|'mixed'} type
 * @property {string[]} [paragraphs]
 * @property {MediaItem[]} [media]
 * @property {string} [note]
 *
 * @typedef {Object} MediaItem
 * @property {'image'|'video'} kind
 * @property {string} src
 * @property {string} [alt]
 * @property {string} [poster]
 * @property {boolean} [controls]
 * @property {boolean} [autoplay]
 * @property {boolean} [loop]
 * @property {boolean} [muted]
 */

/** @type {PageContent} */
const pageContent = {
  title: "<strong>MSP</strong><br><u>P</u>robabilistically Consistent <u>M</u>ulti-<u>S</u>cale Action Generation",
  authors: "Zhixuan Lin, Gengqi Liu, Chao Zheng, Gao Lin, Jindong Yu, Song Gao, Fei Wang",
  affiliation: "School of Robotics, Northeastern University, Shenyang, China",
  venue: "🎉 Accepted to <span class=\"spotlight\">ICML 2026 spotlight</span> 🎉",
  sections: [
    {
      id: "abstract",
      title: "Abstract",
      type: "mixed",
      paragraphs: [
        "In robotic imitation learning, accurately modeling the multimodality and temporal correlations of long-horizon action sequences remains challenging. Long-horizon tasks require preserving global task intent while executing precise low-level control; otherwise, local errors can accumulate and lead to failure. While recent coarse-to-fine autoregressive models have improved action generation, they struggle to maintain consistency across hierarchies, leading to suboptimal performance in long-horizon tasks. To address these shortcomings, we propose Probabilistically Consistent Multi-Scale Action Generation (MSP), a novel coarse-to-fine approach that promotes cross-scale consistency. MSP adopts a streamlined multi-scale design by directly downsampling in a continuous latent action space. A scale-wise autoregressive Transformer is used to generate semantic conditions at each scale, which guide a lightweight MeanFlow model to capture multi-scale latent distributions, enabling probabilistically consistent refinement across scales. Through extensive simulation and real-world experiments, including long-horizon, multi-task, and few-shot generalization settings, we show that MSP outperforms existing coarse-to-fine methods, achieving state-of-the-art performance with high efficiency."
      ],
      media: [
        {
          kind: "image",
          src: "pic/p0_0.png",
          alt: "Abstract overview left"
        },
        {
          kind: "image",
          src: "pic/p0_1.png",
          alt: "Abstract overview right"
        }
      ],
      note: ""
    },
    {
      id: "method-overall",
      title: "Method Overall",
      headingLevel: 2,
      type: "mixed",
      paragraphs: [
        "Overview of the Two Stages of MSP. <strong>Stage 1:</strong> MSP employs a causal Transformer within a VAE framework to encode long action sequences into a smooth, temporally structured continuous latent action space. <strong>Stage 2:</strong> Based on the encoded actions, MSP constructs a coarse-to-fine latent representation <span class=\"math\">Z = {z<sup>1</sup>, ..., z<sup>S</sup>}</span> via downsampling. Given the observation condition <span class=\"math\">C</span>, a scale-wise Transformer processes the sequence <span class=\"math\">{C, Up(z<sup>1</sup>, 2), ..., Up(z<sup>S-1</sup>, 2)}</span>, where <span class=\"math\">Up(&middot;, 2)</span> denotes upsampling by a factor of 2, to generate semantic features <span class=\"math\">Ẑ = {ẑ<sup>1</sup>, ẑ<sup>2</sup>, ..., ẑ<sup>S</sup>}</span> for each scale. These semantic features condition a MeanFlow model, which maps noise samples to the target latent at each scale using a single function evaluation (1-NFE). During inference, MSP recursively synthesizes the latent hierarchy in a coarse-to-fine manner and decodes the finest-scale latent into executable actions."
      ],
      media: [
        {
          kind: "image",
          src: "pic/p1.png",
          alt: "Overview of the Two Stages of MSP"
        }
      ],
      note: ""
    },
    {
      id: "experiment",
      title: "Experiment",
      headingLevel: 2,
      type: "text",
      paragraphs: [
        "We systematically evaluate MSP across simulated and real-world robotic tasks with varying temporal horizons. Through our experiments, we aim to answer the following questions:",
        "1. How does MSP perform against state-of-the-art baselines on long-horizon and multi-task settings?<br>2. Does MSP learn reusable action semantics that enable effective multi-task and few-shot generalization?<br>3. How do the core design choices contribute to the performance and efficiency of our method?<br>4. Can MSP achieve robust real-world deployment?"
      ],
      note: ""
    },
    {
      id: "eval-sim",
      title: "Evaluation on Simulation Benchmarks",
      headingLevel: 3,
      type: "text",
      paragraphs: [],
      media: [
        {
          kind: "image",
          src: "pic/p2.png",
          alt: "Evaluation on simulation benchmarks - row 1"
        }
      ],
      note: ""
    },
    {
      id: "multi-task-few-shot",
      title: "Multi-task and Few-shot Performance.",
      headingLevel: 3,
      type: "image",
      paragraphs: [],
      media: [
        {
          kind: "image",
          src: "pic/p3.png",
          alt: "Performance on LIBERO suites"
        },
        {
          kind: "image",
          src: "pic/p4.png",
          alt: "Multi-task performance"
        },
        {
          kind: "image",
          src: "pic/p4_5.png",
          alt: "Few-shot generalization performance"
        }
      ],
      note: "<strong>Performance on LIBERO Suites.</strong> We report the average success rates over 50 rollouts per task. <strong>Bold</strong> indicates the best result, while <u>underline</u> denotes the second-best. We evaluate the multi-task performance of MSP on LIBERO-90 and its few-shot generalization to unseen tasks."
    },
    {
      id: "robotwin-results",
      title: "RoboTwin2.0 Results.",
      headingLevel: 3,
      type: "image",
      paragraphs: [
        "Success rates on both image and point cloud-based inputs across varying horizons: <strong>Short (100--150 steps)</strong>, <strong>Medium (170--260 steps)</strong>, <strong>Long (280--350 steps)</strong>, and <strong>Extra Long (450--650 steps)</strong>. Models are trained on 50 clean demonstrations and averaged over 100 rollouts. <strong>Tasks:</strong> (1) lift pot; (2) move can pot; (3) place empty cup; (4) place can basket; (5) handover block; (6) stack blocks two; (7) stack bowls three; (8) put bottles dustbin. <strong>Bold</strong> indicates the best result, while <u>underline</u> denotes the second-best."
      ],
      media: [
        {
          kind: "image",
          src: "pic/p5.png",
          alt: "RoboTwin2.0 results"
        }
      ],
      note: ""
    },
    {
      id: "real-world-demos",
      title: "Real World Demos",
      headingLevel: 2,
      type: "video",
      paragraphs: [
        "To evaluate the robustness and effectiveness of MSP in real-world scenarios, we designed five tasks with different temporal horizons: <i>Pick apple</i>, <i>Hang cup</i>, <i>Stack cups</i>, <i>Place object cabinet</i> and <i>Make tea</i>. Additional details are provided in Appendix C."
      ],
      media: [
        {
          kind: "video",
          src: "video/real_world/pick_apple/1.mp4",
          controls: true,
          muted: true,
          loop: true,
          autoplay: false
        },
        {
          kind: "video",
          src: "video/real_world/hang_cup/1.mp4",
          controls: true,
          muted: true,
          loop: true,
          autoplay: false
        },
        {
          kind: "video",
          src: "video/real_world/stack_cups/1.mp4",
          controls: true,
          muted: true,
          loop: true,
          autoplay: false
        },
        {
          kind: "video",
          src: "video/real_world/put_object_cabinet/1.mp4",
          controls: true,
          muted: true,
          loop: true,
          autoplay: false
        },
        {
          kind: "video",
          src: "video/real_world/make_tea/1.mp4",
          controls: true,
          muted: true,
          loop: true,
          autoplay: false
        }
      ],
      note: ""
    },
    {
      id: "simulation-benchmarks",
      title: "Simulation Benchmarks",
      headingLevel: 2,
      type: "video",
      paragraphs: [],
      groups: [
        {
          name: "RoboTwin",
          videos: [
            "video/Simulation/RoboTwin/lift_pot/0.mp4",
            "video/Simulation/RoboTwin/move_can_pot/0.mp4",
            "video/Simulation/RoboTwin/place_empty_cup/0.mp4",
            "video/Simulation/RoboTwin/place_can_basket/0.mp4",
            "video/Simulation/RoboTwin/handover_block/0.mp4",
            "video/Simulation/RoboTwin/stack_blocks_two/0.mp4",
            "video/Simulation/RoboTwin/stack_bowls_three/0.mp4",
            "video/Simulation/RoboTwin/put_bottles_dustbin/0.mp4"
          ]
        },
        {
          name: "libero",
          videos: [
            "video/Simulation/libero/pick up the alphabet soup and place it in the basket.mp4",
            "video/Simulation/libero/pick up the book and place it in the back compartment of the caddy.mp4",
            "video/Simulation/libero/put both the alphabet soup and the cream cheese box in the basket.mp4",
            "video/Simulation/libero/put both the alphabet soup and the tomato sauce in the basket.mp4",
            "video/Simulation/libero/put both the cream cheese box and the butter in the basket.mp4",
            "video/Simulation/libero/put both moka pots on the stove.mp4",
            "video/Simulation/libero/put the black bowl in the bottom drawer of the cabinet and close it.mp4",
            "video/Simulation/libero/put the white mug on the left plate and put the yellow and white mug on the right plate.mp4",
            "video/Simulation/libero/put the white mug on the plate and put the chocolate pudding to the right of the plate.mp4",
            "video/Simulation/libero/put the wine bottle on the rack.mp4",
            "video/Simulation/libero/turn on the stove and put the moka pot on it.mp4",
            "video/Simulation/libero/put the yellow and white mug in the microwave and close it.mp4"
          ]
        }
      ],
      note: ""
    }
  ]
};

function createParagraphList(paragraphs = []) {
  return paragraphs.map((text) => `<p>${text}</p>`).join("");
}

function createMediaBlock(media = []) {
  return media
    .map((item) => {
      if (item.kind === "image") {
        return `<img src="${item.src}" alt="${item.alt || "image"}" loading="lazy" />`;
      }

      if (item.kind === "video") {
        if (!item.src) {
          return `<p class="meta">[Video placeholder] 请提供视频地址后渲染。</p>`;
        }

        const controls = item.controls === false ? "" : "controls";
        const autoplay = item.autoplay ? "autoplay" : "";
        const loop = item.loop ? "loop" : "";
        const muted = item.muted ? "muted" : "";
        const poster = item.poster ? `poster="${item.poster}"` : "";

        return `
          <video ${controls} ${autoplay} ${loop} ${muted} ${poster}>
            <source src="${item.src}" />
            Your browser does not support the video tag.
          </video>
        `;
      }

      return "";
    })
    .join("");
}

function renderSection(section) {
  const hasText = (section.paragraphs || []).length > 0;
  const hasMedia = (section.media || []).length > 0;
  const isSplit = hasText && hasMedia && (section.type === "mixed" || section.type === "image" || section.type === "video");
  const titleFirstWithMedia = section.type === "mixed";
  const headingTag = section.headingLevel === 3 ? "h3" : "h2";
  const noteHtml = section.note ? `<p class="meta">${section.note}</p>` : "";
  const isEvalSimSection = section.id === "eval-sim";
  const isMultiTaskSection = section.id === "multi-task-few-shot";
  const isRealWorldSection = section.id === "real-world-demos";
  const isSimulationSection = section.id === "simulation-benchmarks";
  const isAbstractSection = section.id === "abstract";
  const mediaList = section.media || [];
  const firstMediaHtml = mediaList[0] ? createMediaBlock([mediaList[0]]) : "";
  const secondMediaHtml = mediaList[1] ? createMediaBlock([mediaList[1]]) : "";
  const thirdMediaHtml = mediaList[2] ? createMediaBlock([mediaList[2]]) : "";

  if (isEvalSimSection) {
    return `
      <section id="${section.id}" class="section">
        <div>
          <${headingTag}>${section.title}</${headingTag}>
          ${firstMediaHtml}
          ${noteHtml}
          ${secondMediaHtml}
        </div>
      </section>
    `;
  }

  if (isAbstractSection) {
    const abstractMedia = section.media || [];
    const leftAbstractImage = abstractMedia[0] ? createMediaBlock([abstractMedia[0]]) : "";
    const rightAbstractImage = abstractMedia[1] ? createMediaBlock([abstractMedia[1]]) : "";
    return `
      <section id="${section.id}" class="section">
        <div>
          <div class="abstract-media-row">
            <div class="abstract-media-item">${leftAbstractImage}</div>
            <div class="abstract-media-item">${rightAbstractImage}</div>
          </div>
          <${headingTag}>${section.title}</${headingTag}>
          ${createParagraphList(section.paragraphs)}
          ${noteHtml}
        </div>
      </section>
    `;
  }

  if (isMultiTaskSection) {
    return `
      <section id="${section.id}" class="section">
        <div>
          <${headingTag}>${section.title}</${headingTag}>
          <div class="tri-media-layout">
            <div class="tri-media-left">${firstMediaHtml}</div>
            <div class="tri-media-right">
              <div class="tri-media-right-item">${secondMediaHtml}</div>
              <div class="tri-media-right-item">${thirdMediaHtml}</div>
            </div>
          </div>
          ${noteHtml}
        </div>
      </section>
    `;
  }

  if (isRealWorldSection) {
    const videos = (section.media || [])
      .map((item) => {
        const folderName = item.src.split("/").slice(-2, -1)[0] || "demo";
        const title = folderName.replace(/_/g, " ");
        const controls = item.controls === false ? "" : "controls";
        const autoplay = item.autoplay ? "autoplay" : "";
        const loop = item.loop ? "loop" : "";
        const muted = item.muted ? "muted" : "";

        return `
          <div class="video-card">
            <div class="video-wrap">
              <span class="speed-badge">1x speed</span>
              <video ${controls} ${autoplay} ${loop} ${muted}>
                <source src="${item.src}" />
                Your browser does not support the video tag.
              </video>
            </div>
            <p class="video-name">${title}</p>
          </div>
        `;
      })
      .join("");

    return `
      <section id="${section.id}" class="section">
        <div>
          <${headingTag}>${section.title}</${headingTag}>
          ${createParagraphList(section.paragraphs)}
          <div class="video-grid">${videos}</div>
        </div>
      </section>
    `;
  }

  if (isSimulationSection) {
    const groups = (section.groups || [])
      .map((group) => {
        const videos = (group.videos || [])
          .map((src) => {
            return `
              <div class="video-card">
                <div class="video-wrap">
                  <video controls muted loop>
                    <source src="${src}" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            `;
          })
          .join("");

        return `
          <div class="sim-group">
            <h3>${group.name}</h3>
            <div class="sim-video-grid">${videos}</div>
          </div>
        `;
      })
      .join("");

    return `
      <section id="${section.id}" class="section">
        <div>
          <${headingTag}>${section.title}</${headingTag}>
          ${groups}
        </div>
      </section>
    `;
  }

  return `
    <section id="${section.id}" class="section ${isSplit ? "section--split" : ""}">
      <div>
        <${headingTag}>${section.title}</${headingTag}>
        ${hasMedia && titleFirstWithMedia ? createMediaBlock(section.media) : ""}
        ${createParagraphList(section.paragraphs)}
        ${hasMedia && !titleFirstWithMedia ? "" : noteHtml}
      </div>
      ${hasMedia && !titleFirstWithMedia ? `<div>${createMediaBlock(section.media)}</div>` : ""}
      ${hasMedia && !titleFirstWithMedia ? noteHtml : ""}
    </section>
  `;
}

function bootstrap(content) {
  const titleEl = document.getElementById("page-title");
  const authorsEl = document.getElementById("page-authors");
  const affiliationEl = document.getElementById("page-affiliation");
  const venueEl = document.getElementById("page-venue");
  const rootEl = document.getElementById("content-root");

  titleEl.innerHTML = content.title;
  authorsEl.innerHTML = `<strong>${content.authors}</strong>`;
  affiliationEl.innerHTML = `<strong>${content.affiliation}</strong>`;
  venueEl.innerHTML = `<strong>${content.venue}</strong>`;
  rootEl.innerHTML = content.sections.map(renderSection).join("");
}

bootstrap(pageContent);
