gcloud compute instance-templates create stable-diffusion-test-instance-template-3 \
    --machine-type n1-standard-4 \
    --accelerator type=nvidia-tesla-t4,count=1 \
    --image=stable-diffusion-test-image-1 \
    --maintenance-policy TERMINATE \
    --restart-on-failure