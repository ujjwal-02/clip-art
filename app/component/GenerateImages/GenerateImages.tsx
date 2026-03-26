

import { useRef } from "react";
import { Button } from "react-native";


// global.Buffer = Buffer;

const GenerateImages = (props: any) => {
    const cache = useRef<any>({});

    const allStyles: any = {
        Cartoon: "cartoon",
        Anime: "anime",
        Flat: "flat",
        Sketch: "sketch",
    };

    const generateImages = async () => {

        // const generateImages = async () => {
        //     props.setLoading(true);
        //     props.setStatus("processing");

        //     try {
        //         const styles = [
        //             "cartoon portrait",
        //             "anime portrait",
        //             "flat illustration",
        //             "pencil sketch",
        //         ];

        //         const promises = styles.map(async (style) => {
        //             const res = await fetch(
        //                 "https://router.huggingface.co/hf-inference/models/stabilityai/stable-diffusion-2",
        //                 {
        //                     method: "POST",
        //                     headers: {
        //                         Authorization: `Bearer ${HF_API_KEY}`,
        //                         "Content-Type": "application/json",
        //                     },
        //                     body: JSON.stringify({
        //                         inputs: `${style} of a person, high quality, detailed`,
        //                     }),
        //                 }
        //             );

        //             if (!res.ok) {
        //                 const text = await res.text();
        //                 console.log("HF ERROR 👉", text);
        //                 return null;
        //             }

        //             if (res.status === 503) {
        //                 console.log("Model loading, retrying...");
        //                 await new Promise((r) => setTimeout(r, 5000));
        //                 return null;
        //             }


        //             const arrayBuffer = await res.arrayBuffer();

        //             // Convert to base64 (React Native compatible)
        //             const base64 = Buffer.from(arrayBuffer).toString("base64");

        //             return `data:image/png;base64,${base64}`;
        //         });

        //         const results = await Promise.all(promises);

        //         props.setResults(results.filter(Boolean));
        //         props.setStatus("success");
        //     } catch (err) {
        //         console.log("ERROR 👉", err);
        //         props.setError("Generation failed");
        //     }

        //     props.setLoading(false);
        // };

        // const generateImages = async () => {
        //     props.setLoading(true);
        //     props.setStatus("processing");

        //     try {
        //         const styles = [
        //             { name: "Cartoon", prompt: "cartoon portrait of a person, vibrant colors" },
        //             { name: "Anime", prompt: "anime style portrait of a person" },
        //             { name: "Flat", prompt: "flat illustration portrait minimal style" },
        //             { name: "Sketch", prompt: "pencil sketch portrait of a person" },
        //         ];

        //         const results = styles.map((style) => {
        //             const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(
        //                 style.prompt
        //             )}?width=512&height=512&seed=${Math.floor(Math.random() * 100000)}&model=flux&t=${Date.now()}`;

        //             console.log("IMAGE URL 👉", url);

        //             return {
        //                 name: style.name,
        //                 url,
        //             };
        //         });

        //         // simulate loading for UX
        //         await new Promise((r) => setTimeout(r, 2000));



        //         props.setResults(results);
        //         props.setStatus("success");
        //     } catch (err) {
        //         console.log("ERROR 👉", err);
        //         props.setError("Generation failed");
        //     }

        //     props.setLoading(false);
        // };
        if (cache.current[props.image]) {
            props.setResults(cache.current[props.image]);
            props.setStatus("success");
            return;
        }

        props.setLoading(true);
        props.setStatus("processing");
        props.setResults([]);

        // const styles = props.selectedStyles.map((s: any) => ({
        //     name: s,
        //     seed: allStyles[s],
        // }));
        const styles = props.selectedStyles.map((s: any) => ({
            name: s,
            prompt: `${s} style portrait of a person, high quality, detailed`,
        }));

        try {
            // 🚀 PARALLEL CALLS
            // const promises = styles.map(async (style: any) => {
            //     await new Promise((r) => setTimeout(r, 800));

            //     return {
            //         name: style.name,
            //         url: `https://picsum.photos/seed/${style.seed}/300/300`,
            //     };
            // });

            const promises = styles.map(async (style: any) => {
                const res = await fetch("http://192.168.1.4:5000/generate", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        prompt: style.prompt,
                    }),
                });

                const data = await res.json();

                return {
                    name: style.name,
                    url: data.url,
                };
            });

            const results = await Promise.all(promises);

            // ✨ progressive UI feel
            results.forEach((item, index) => {
                setTimeout(() => {
                    props.setResults((prev: any) => [...prev, item]);
                }, index * 300);
            });

            cache.current[props.image] = results;

            props.setStatus("success");
        } catch (err) {
            props.setError("Generation failed");

            const fallback = styles.map((s: any) => ({
                name: s.name,
                url: `https://picsum.photos/seed/${s.name}/300/300`,
            }));

            props.setResults(fallback);
            props.setError("API failed, using demo images");
        }

        props.setLoading(false);
    };






    return (
        <>
            <Button
                title="Generate Styles"
                onPress={generateImages}
                disabled={props.loading}
            />

            {props.status === "success" && (
                <Button title="Regenerate" onPress={generateImages} />
            )}
        </>
    );
};

export default GenerateImages;