export default {
	async fetch(request, env, ctx): Promise<Response> {
		request.signal.onabort = () => {
			console.log('The request was aborted!');
		  };
	  
		  const { readable, writable } = new IdentityTransformStream();
		  ctx.waitUntil(sendPing(writable));
		  return new Response(readable);
	},
} satisfies ExportedHandler<Env>;


async function sendPing(writable: WritableStream): Promise<void> {
	const writer = writable.getWriter();
	const enc = new TextEncoder();

	for (;;) {
	  // Send 'ping' every second to keep the connection alive
	  await writer.write(enc.encode('ping')); 
	  scheduler.wait(1000);
	}
 }