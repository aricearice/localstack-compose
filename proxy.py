from mitmproxy import ctx
import mitmproxy.http
import os

class LocalRedirect:

  def __init__(self):
    print('Loaded redirect addon')

  def request(self, flow: mitmproxy.http.HTTPFlow):
    if flow.request.host.endswith("s3.amazonaws.com"):
      ctx.log.info("pretty host is: %s" % flow.request.pretty_host)
      ctx.log.info("path is: %s" % flow.request.path)
      components = flow.request.pretty_host.split('.s3.amazonaws.com')
      bucket = components[0]

      flow.request.host = "localstack"
      flow.request.scheme = 'http'
      flow.request.port = 4572
      flow.request.path = "/" + bucket + flow.request.path
    elif flow.request.host.endswith("logs.us-east-1.amazonaws.com"):
      ctx.log.info("pretty host is: %s" % flow.request.pretty_host)
      ctx.log.info("path is: %s" % flow.request.path)
      flow.request.host = "localstack"
      flow.request.scheme = 'http'
      flow.request.port = 4586
    elif flow.request.host.endswith("amazonaws.com"):
      ctx.log.info("pretty host is: %s" % flow.request.pretty_host)

      # Patch localstack's CF UpdateTerminationProtection call
      # which seems to fail with a 500.
      if flow.request.method == "POST" and flow.request.pretty_host == "cloudformation.us-east-1.amazonaws.com":
        form = dict(flow.request.urlencoded_form)
        action = form["Action"]
        if action == "UpdateTerminationProtection":
          flow.response = mitmproxy.http.HTTPResponse.make(
            200,
            b"<UpdateTerminationProtectionResponse xmlns=\"https://cloudformation.amazonaws.com/doc/2011-06-15/\"><StackId>arn:aws:cloudformation:us-east-1:000000000000:stack/StagingBucket/7ea87b50-46e7-11e7-9c9b-503a90a9c4d1</StackId></UpdateTerminationProtectionResponse>",
            {"Content-Type": "text/xml"}
          )

      flow.request.host = "localstack"
      flow.request.scheme = 'http'
    elif flow.request.host == "localhost":
      ctx.log.info("pretty host is: %s" % flow.request.pretty_host)
      flow.request.host = "localstack"
      flow.request.scheme = 'http'

addons = [
  LocalRedirect()
]
