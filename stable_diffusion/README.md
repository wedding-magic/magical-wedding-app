### Instructions to update the Instance Template which is the environment used when the Batch API is called.

1) Make sure the instance-2 virtual machine instance on Compute Engine is up-to-date, as the Instance Template will be a carbon copy of this.

2) Create a new Machine Image of instance-2 using this command (this may take 15 minutes or so to complete):

      ```
      gcloud compute images create stable-diffusion-image-4 \
        --project=stable-diffusion-372315 \
        --source-disk=instance-2 \
        --source-disk-zone=us-west1-b \
        --storage-location=us
      ```     

      Note that this command creates an image named "stable-diffusion-image-4", which is referred to in step 3. This image already exists, so you will need to delete the existing image first (https://console.cloud.google.com/compute/images?project=stable-diffusion-372315), or increment the number in the name. Deleting the old image may be preferable to save storage costs.

3) Create a new Instance Template with this command:

      ```
      gcloud compute instance-templates create stable-diffusion-instance-template-4 \
      --machine-type n1-standard-4 \
      --accelerator type=nvidia-tesla-t4,count=1 \
      --image=stable-diffusion-image-4 \
      --maintenance-policy TERMINATE \
      --restart-on-failure
      ```

      Same as above, you will need to delete the existing "stable-diffusion-instance-template-4" (https://console.cloud.google.com/compute/instanceTemplates/list?project=stable-diffusion-372315), or increment the number in the name.

4) If you changed the name of the instance template, you will want to update the name in the JSON data file which is sent to invoke the Batch API. The section to change is:

      ```
      "allocationPolicy": {
        "instances": [
            {
                "instanceTemplate": "stable-diffusion-instance-template-4"
            }
        ]
      }
      ```
