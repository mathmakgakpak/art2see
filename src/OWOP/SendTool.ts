import { OWOPInterface } from "../interfaces";
// unfinished
// function createTool(onfinish: (point1, point2) => undefined) {

// }

function drawText(ctx:CanvasRenderingContext2D, str: string, x: number, y: number, centered: boolean){
	ctx.strokeStyle = "#000000",
	ctx.fillStyle = "#FFFFFF",
	ctx.lineWidth = 2.5,
	ctx.globalAlpha = 0.5;
	if(centered) {
		x -= ctx.measureText(str).width >> 1;
	}
	ctx.strokeText(str, x, y);
	ctx.globalAlpha = 1;
	ctx.fillText(str, x, y);
}

new OWOP.tools.class('Export', OWOP.cursors.select, OWOP.fx.player.none, OWOP.RANK.NONE,
		(tool: {
			extra: {
				start: null | [number, number]
				end: null | [number, number]
				clicking: boolean
			},
			setEvent(...value: unknown[]): undefined
			setFxRenderer(...value: unknown[]): undefined
		}) => {
			// tool variables
			tool.extra.start = null;
			tool.extra.end = null;
			tool.extra.clicking = false;
			
			tool.setFxRenderer((fx: any, ctx: CanvasRenderingContext2D, time: number) => {
				if (!fx.extra.isLocalPlayer) return 1;
				var x: number = fx.extra.player.x;
				var y: number = fx.extra.player.y;
				var fxx = (Math.floor(x / 16) - OWOP.camera.x) * OWOP.camera.zoom;
				var fxy = (Math.floor(y / 16) - OWOP.camera.y) * OWOP.camera.zoom;
				var oldlinew = ctx.lineWidth;
				ctx.lineWidth = 1;
				if (tool.extra.start && tool.extra.end) {
					var s = tool.extra.start;
					var e = tool.extra.end;
					var x = (s[0] - OWOP.camera.x) * OWOP.camera.zoom + 0.5;
					var y = (s[1] - OWOP.camera.y) * OWOP.camera.zoom + 0.5;
					var w = e[0] - s[0];
					var h = e[1] - s[1];
					ctx.beginPath();
					ctx.rect(x, y, w * OWOP.camera.zoom, h * OWOP.camera.zoom);
					ctx.globalAlpha = 1;
					ctx.strokeStyle = "#FFFFFF";
					ctx.stroke();
					ctx.setLineDash([3, 4]);
					ctx.strokeStyle = "#000000";
					ctx.stroke();
					ctx.globalAlpha = 0.25 + Math.sin(time / 500) / 4;
					// @ts-ignore
					ctx.fillStyle = OWOP.renderer.patterns.unloaded;
					ctx.fill();
					ctx.setLineDash([]);
					var oldfont = ctx.font;
					ctx.font = "16px sans-serif";
					var txt = `${!tool.extra.clicking ? "Right click to screenshot " : ""}(${Math.abs(w)}x${Math.abs(h)})`;
					var txtx = window.innerWidth >> 1;
					var txty = window.innerHeight >> 1;
					txtx = Math.max(x, Math.min(txtx, x + w * OWOP.camera.zoom));
					txty = Math.max(y, Math.min(txty, y + h * OWOP.camera.zoom));

					drawText(ctx, txt, txtx, txty, true);
					ctx.font = oldfont;
					ctx.lineWidth = oldlinew;
					return 0;
				} else {
					ctx.beginPath();
					ctx.moveTo(0, fxy + 0.5);
					ctx.lineTo(window.innerWidth, fxy + 0.5);
					ctx.moveTo(fxx + 0.5, 0);
					ctx.lineTo(fxx + 0.5, window.innerHeight);

					//ctx.lineWidth = 1;
					ctx.globalAlpha = 1;
					ctx.strokeStyle = "#FFFFFF";
					ctx.stroke();
					ctx.setLineDash([3]);
					ctx.strokeStyle = "#000000";
					ctx.stroke();

					ctx.setLineDash([]);
					ctx.lineWidth = oldlinew;
					return 1;
				}
			});

			

			

			tool.setEvent('mousedown', (mouse: OWOPInterface["mouse"], event: MouseEvent) => {
				var s = tool.extra.start;
				var e = tool.extra.end;
				//@ts-ignore
				const isInside = () => mouse.tileX >= s[0] && mouse.tileX < e[0] && mouse.tileY >= s[1] && mouse.tileY < e[1];
				if (mouse.buttons === 1 && s && !e) {
					tool.extra.start = [mouse.tileX, mouse.tileY];
					tool.extra.clicking = true;
					tool.setEvent('mousemove', (mouse: any, event: MouseEvent) => {
						if (tool.extra.start && mouse.buttons === 1) {
							tool.extra.end = [mouse.tileX, mouse.tileY];
							return 1;
						}
					});
					const finish = () => {
						tool.setEvent('mousemove mouseup deselect', null);
						tool.extra.clicking = false;
						var s = tool.extra.start;
						var e = tool.extra.end;
						// correct positions
						if (s && e) {
							if (s[0] === e[0] || s[1] === e[1]) {
								tool.extra.start = null;
								tool.extra.end = null;
							}
							if (s[0] > e[0]) {
								var tmp = e[0];
								e[0] = s[0];
								s[0] = tmp;
							}
							if (s[1] > e[1]) {
								var tmp = e[1];
								e[1] = s[1];
								s[1] = tmp;
							}
						}
						// @ts-ignore
						OWOP.renderer.render(OWOP.renderer.rendertype.FX);
					};
					tool.setEvent('deselect', finish);
					tool.setEvent('mouseup', (mouse: OWOPInterface["mouse"], event: MouseEvent) => {
						if (!(mouse.buttons & 1)) {
							finish();
						}
					});
				} else if (mouse.buttons === 1 && tool.extra.end) {
					if (isInside()) {
						var offx = mouse.tileX;
						var offy = mouse.tileY;
						tool.setEvent('mousemove', (mouse: OWOPInterface["mouse"], event: MouseEvent) => {
							if(!s || !e) return;

							var dx = mouse.tileX - offx;
							var dy = mouse.tileY - offy;
							tool.extra.start = [s[0] + dx, s[1] + dy];
							tool.extra.end = [e[0] + dx, e[1] + dy];
						});
						const end = () => {
							tool.setEvent('mouseup deselect mousemove', null);
						};
						tool.setEvent('deselect', end);
						tool.setEvent('mouseup', (mouse: OWOPInterface["mouse"], event: MouseEvent) => {
							if (!(mouse.buttons & 1)) {
								end();
							}
						});
					} else {
						tool.extra.start = null;
						tool.extra.end = null;
					}
				} else if (mouse.buttons === 2 && tool.extra.end && isInside()) {
					if(!s || !e) return;
					tool.extra.start = null;
					tool.extra.end = null;
					// finish
					(s[0], s[1], e[0] - s[0], e[1] - s[1]);

				}
			});
		}
	);