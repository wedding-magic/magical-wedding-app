mkdir /home/tobrien6/sd
cd /home/tobrien6/sd

git clone https://github.com/Stability-AI/stablediffusion
git clone https://github.com/AUTOMATIC1111/stable-diffusion-webui

cd /home/tobrien6/sd/stable-diffusion-webui/

mkdir -p cache/{huggingface,torch}

cd /home/tobrien6

#ln -s /home/tobrien6/sd/stable-diffusion-webui/cache/huggingface ../root/.cache/
#ln -s /home/tobrien6/stable-diffusion-webui/cache/torch ../root/.cache/

rm /home/tobrien6/sd/stable-diffusion-webui/webui.sh
rm /home/tobrien6/sd/stable-diffusion-webui/modules/paths.py
rm /home/tobrien6/sd/stable-diffusion-webui/webui.py
rm /home/tobrien6/sd/stable-diffusion-webui/modules/ui.py
rm /home/tobrien6/sd/stable-diffusion-webui/style.css
rm /home/tobrien6/sd/stable-diffusion-webui/modules/shared.py

cd /home/tobrien6/sd/stable-diffusion-webui/
git pull

mkdir /home/tobrien6/sd/stablediffusion/src
cd /home/tobrien6/sd/stablediffusion/src

git clone https://github.com/CompVis/taming-transformers
git clone https://github.com/openai/CLIP
git clone https://github.com/salesforce/BLIP
git clone https://github.com/sczhou/CodeFormer
git clone https://github.com/crowsonkb/k-diffusion

mv /home/tobrien6/sd/stablediffusion/src/CLIP /home/tobrien6/sd/stablediffusion/src/clip
mv  /home/tobrien6/sd/stablediffusion/src/BLIP /home/tobrien6/sd/stablediffusion/src/blip
mv  /home/tobrien6/sd/stablediffusion/src/CodeFormer /home/tobrien6/sd/stablediffusion/src/codeformer

cp -r /home/tobrien6/sd/stablediffusion/src/k-diffusion/k_diffusion /home/tobrien6/sd/stable-diffusion-webui/

cd /home/tobrien6/sd/stable-diffusion-webui/modules

#### NOTE: NEEDED TO UPDATE PATH HERE FOR LOCAL SYSTEM. TODO: ADD sed STATEMENT TO THIS FILE
wget -O paths.py https://raw.githubusercontent.com/TheLastBen/fast-stable-diffusion/main/AUTOMATIC1111_files/paths.py

#npm install -g localtunnel

cd /home/tobrien6/sd/stable-diffusion-webui/

wget -O webui.py https://raw.githubusercontent.com/AUTOMATIC1111/stable-diffusion-webui/master/webui.py
sed -i 's@ui.create_ui().*@ui.create_ui();shared.demo.queue(concurrency_count=999999,status_update_rate=0.1)@' /home/tobrien6/sd/stable-diffusion-webui/webui.py

cd /home/tobrien6/sd/stable-diffusion-webui/modules/

wget -O shared.py https://raw.githubusercontent.com/AUTOMATIC1111/stable-diffusion-webui/master/modules/shared.py
wget -O ui.py https://raw.githubusercontent.com/AUTOMATIC1111/stable-diffusion-webui/master/modules/ui.py
sed -i 's@css = "".*@with open(os.path.join(script_path, "style.css"), "r", encoding="utf8") as file:\n        css = file.read()@' /home/tobrien6/sd/stable-diffusion-webui/modules/ui.py

cd /home/tobrien6/sd/stable-diffusion-webui

wget -O style.css https://raw.githubusercontent.com/AUTOMATIC1111/stable-diffusion-webui/master/style.css
sed -i 's@min-height: 4.*@min-height: 5.5em;@g' /home/tobrien6/sd/stable-diffusion-webui/style.css

# WHY DOESN'T THIS EXIST
#sed -i 's@"multiple_tqdm": true,@\"multiple_tqdm": false,@' /home/tobrien6/sd/stable-diffusion-webui/config.json

sed -i '902s@.*@        self.logvar = self.logvar.to(self.device)@' /home/tobrien6/sd/stablediffusion/ldm/models/diffusion/ddpm.py

#if os.path.exists("/home/tobrien6/sd/stable-diffusion-webui/extensions/openOutpaint-webUI-extension"):
#	cd /home/tobrien6/sd/stable-diffusion-webui/extensions/openOutpaint-webUI-extension/scripts
#	wget -O main.py https://raw.githubusercontent.com/TheLastBen/fast-stable-diffusion/main/AUTOMATIC1111_files/outpaint/main.py

cd /home/tobrien6

sed -i 's@cmd_opts.lowram else \"cuda\"@cmd_opts.lowram else \"cpu\"@' /home/tobrien6/sd/stable-diffusion-webui/modules/shared.py

#share=''
#!nohup lt --port 7860 > srv.txt 2>&1 &
#time.sleep(2)
#!grep -o 'https[^ ]*' /content/srv.txt >srvr.txt
#time.sleep(2)
#srv= getoutput('cat /content/srvr.txt')

#for line in fileinput.input('/usr/local/lib/python3.8/dist-packages/gradio/blocks.py', inplace=True):
#if line.strip().startswith('self.server_name ='):
#    line = f'            self.server_name = "{srv[8:]}"\n'
#if line.strip().startswith('self.server_port ='):
#    line = '            self.server_port = 443\n'
#if line.strip().startswith('self.protocol = "https"'):
#    line = '            self.protocol = "https"\n'
#if line.strip().startswith('if self.local_url.startswith("https") or self.is_colab'):
#    line = ''    
#if line.strip().startswith('else "http"'):
#    line = ''              
#sys.stdout.write(line)

#!sed -i '13s@.*@    "PUBLIC_SHARE_TRUE": "[32mConnected",@' /usr/local/lib/python3.8/dist-packages/gradio/strings.py

#!rm /content/srv.txt
#!rm /content/srvr.txt

cd /home/tobrien6/sd/stablediffusion/

#configf=""
#!sed -i 's@def load_state_dict(checkpoint_path: str, map_location.*@def load_state_dict(checkpoint_path: str, map_location="cpu"):@' /usr/local/lib/python3.8/dist-packages/open_clip/factory.py
#NM="False"

#if os.path.exists('/usr/local/lib/python3.8/dist-packages/xformers'):
#  xformers="--xformers" 
#else:
#  xformers=""

# RUN COMMAND TO BE INVOKED WITHIN DOCKER RUN COMMAND:
#python /content/sd/stable-diffusion-webui/webui.py $share --disable-safe-unpickle --no-half-vae --enable-insecure-extension-access  --ckpt "$path_to_trained_model" $configf $xformers
