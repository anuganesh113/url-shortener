// import { useState } from "react";
// import { CopyToClipboard } from "react-copy-to-clipboard";
// import "./Home.css";
// import send from './icons/send.png';
// import copyicon from './icons/copy.png';
// import copiedicon from './icons/copied.png';

// function Home() {
//   const [longURL, setLongUrl] = useState("");
//   const [shortLink, setShortLink] = useState({});
//   const [active, setActive] = useState(false);
//   const [copy, setCopy] = useState(false);

//   function handleChange(e) {
//     setLongUrl(e.target.value);
//   }

//   async function handleSubmit(e) {
//     e.preventDefault();
//     await fetch("https://api-ssl.bitly.com/v4/shorten", {
//       method: "POST",
//       mode: "cors",
//       headers: {
//         Authorization: `Bearer ${process.env.REACT_APP_BITLY_TOKEN}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         long_url: longURL,
//         domain: "bit.ly",
//         group_guid: `${process.env.REACT_APP_GUID}`,
//       }),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         const new_link = data.link.replace("https://", "");
//         fetch(
//           `https://api-ssl.bitly.com/v4/bitlinks/${new_link}/qr?image_format=png`,
//           {
//             mode: "cors",
//             headers: {
//               Authorization: `Bearer ${process.env.REACT_APP_BITLY_TOKEN}`,
//             },
//           }
//         )
//           .then((response) => response.json())
//           .then((result) => {
//             setShortLink(result);
//             setActive(true);
//           });
//       });
//     setLongUrl("");
//   }

//   return (
//     <div className="App">
//       <div className="app-wrapper">

//       <h2 class="app-title">LINK SHORTENER</h2>
//       <div>
//         <form method="post" action="" onSubmit={handleSubmit}>
//           <input
//             name="long_url"
//             type="text"
//             value={longURL}
//             placeholder="Paste your url"
//             onChange={handleChange}
//           />
//           <button class="submit-btn" type="submit">Shorten</button>
//         </form>

//       </div>
//       </div>


//       {/* show on success... */}

//       {active ? (
//         <div className="show_links">
//           <div>
//             <h3 style={{textAlign: 'center'}}>YOUR SHORTENED URL </h3>
//             <span>
//               <p>{shortLink.link}</p>
//               <CopyToClipboard onCopy={()=>{
//                 setCopy(true);
//               }} text={shortLink.link}>{ !copy ? <img src={copyicon} alt="copy icon" width="17px" height="17px"/> : <img src={copiedicon} alt="copy icon" width="17px" height="17px"/>  }</CopyToClipboard>

//             </span>
//           </div>
//           <div class="qr-code">
//           <img src={shortLink.qr_code} alt="Qr code" className="qr_img"/>
//           </div>
//         </div>
//       ) : (
//         ""
//       )}
//     </div>
//   );
// }

// export default Home;




import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import "./Home.css";
import send from './icons/send.png';
import copyicon from './icons/copy.png';
import copiedicon from './icons/copied.png';

function Home() {
  const [longURL, setLongUrl] = useState("");
  const [customSlug, setCustomSlug] = useState(""); // Added state for custom slug
  const [shortLink, setShortLink] = useState({});
  const [active, setActive] = useState(false);
  const [copy, setCopy] = useState(false);

  function handleChange(e) {
    if (e.target.name === "long_url") {
      setLongUrl(e.target.value);
    } else if (e.target.name === "custom_slug") {
      setCustomSlug(e.target.value);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    let url = "https://api-ssl.bitly.com/v4/shorten";
    if (customSlug) {
      url = `${url}?custom_bitlink=${customSlug}`;
    }

    await fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_BITLY_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        long_url: longURL,
        domain: "bit.ly",
        group_guid: `${process.env.REACT_APP_GUID}`,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        const new_link = data.link.replace("https://", "");
        fetch(
          `https://api-ssl.bitly.com/v4/bitlinks/${new_link}/qr?image_format=png`,
          {
            mode: "cors",
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_BITLY_TOKEN}`,
            },
          }
        )
          .then((response) => response.json())
          .then((result) => {
            setShortLink(result);
            setActive(true);
          });
      });
    setLongUrl("");
    setCustomSlug(""); // Clear the custom slug after submission
  }

  return (
    <div className="App">
      <div className="app-wrapper">

      <h2 className="app-title">LINK SHORTENER</h2>
      <div>
        <form method="post" action="" onSubmit={handleSubmit}>
          <input
            name="long_url"
            type="text"
            value={longURL}
            placeholder="Paste your url"
            onChange={handleChange}
          />
          <input
            name="custom_slug"
            type="text"
            value={customSlug}
            placeholder="Custom Slug (optional)"
            onChange={handleChange}
          />
          <button className="submit-btn" type="submit">Shorten</button>
        </form>

      </div>
      </div>

      {/* show on success... */}

      {active ? (
        <div className="show_links">
          <div>
            <h3 style={{textAlign: 'center'}}>YOUR SHORTENED URL </h3>
            <span>
              <p>{shortLink.link}</p>
              <CopyToClipboard onCopy={()=>{
                setCopy(true);
              }} text={shortLink.link}>{ !copy ? <img src={copyicon} alt="copy icon" width="17px" height="17px"/> : <img src={copiedicon} alt="copy icon" width="17px" height="17px"/>  }</CopyToClipboard>

            </span>
          </div>
          <div className="qr-code">
            <img src={shortLink.qr_code} alt="Qr code" className="qr_img"/>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Home;


