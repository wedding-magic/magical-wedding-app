gcloud compute instance-templates create stable-diffusion-instance-template-4 \
    --machine-type n1-standard-4 \
    --accelerator type=nvidia-tesla-t4,count=1 \
    --image=stable-diffusion-image-3 \
    --maintenance-policy TERMINATE \
    --restart-on-failure