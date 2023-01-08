cd /home/tobrien6

git lfs install
git clone https://huggingface.co/runwayml/stable-diffusion-v1-5
rm -r /home/tobrien6/stable-diffusion-v1-5/safety_checker
rm -r /home/tobrien6/stable-diffusion-v1-5/feature_extractor
rm /home/tobrien6/stable-diffusion-v1-5/v1-5-pruned-emaonly.ckpt
rm /home/tobrien6/stable-diffusion-v1-5/v1-5-pruned.ckpt
rm /home/tobrien6/stable-diffusion-v1-5/v1-inference.yaml

git clone "https://huggingface.co/stabilityai/sd-vae-ft-mse"
rm -r /home/tobrien6/stable-diffusion-v1-5/vae
mv /home/tobrien6/sd-vae-ft-mse /home/tobrien6/stable-diffusion-v1-5/vae

cd /home/tobrien6/stable-diffusion-v1-5
rm model_index.json
wget https://raw.githubusercontent.com/TheLastBen/fast-stable-diffusion/main/Dreambooth/model_index.json

sed -i 's@"clip_sample": false@@g' /home/tobrien6/stable-diffusion-v1-5/scheduler/scheduler_config.json
sed -i 's@"trained_betas": null,@"trained_betas": null@g' /home/tobrien6/stable-diffusion-v1-5/scheduler/scheduler_config.json
sed -i 's@"sample_size": 256,@"sample_size": 512,@g' /home/tobrien6/stable-diffusion-v1-5/vae/config.json  

wget -O convertosd.py https://github.com/TheLastBen/fast-stable-diffusion/raw/main/Dreambooth/convertosd.py
sed -i '201s@.*@    model_path = "/content/model_trained_output"@' /content/convertosd.py
sed -i '202s@.*@    checkpoint_path= "/content/checkpoint/model.ckpt"@' /content/convertosd.py